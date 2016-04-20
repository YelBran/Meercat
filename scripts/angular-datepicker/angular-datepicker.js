angular.module('angular-datepicker',[])
.directive('datePicker',[
  ->
    restrict:'A'
    scope:
      'ngModel':'='
      'resultStayData':'='
    link:(scope,element,attrs)->
      obj=
        date:new Date()
        year:-1
        month:-1
        singlePriceArr:[]
        doublePriceArr:[]
        triplePriceArr:[]
      htmlObj=
        header:''
        left:''
        right:''
      elemId=null
      getAbsoluteLeft=(objectId)->        
        o=document.getElementById(objectId)
        oLeft=o.offsetLeft
        while o.offsetParent !=null
          oParent=o.offsetParent
          oLeft+=oParent.offsetLeft
          o=oParent
        return oLeft
      # 获取控件上绝对位置
      getAbsoluteTop=(objectId)->
        o=document.getElementById(objectId)
        oTop=o.offsetTop+o.offsetHeight+10
        while o.offsetParent !=null
          oParent=o.offsetParent
          oTop+=oParent.offsetTop
          o=oParent
        return oTop 
      # 获取控件宽度  
      getElementWidth=(objectId)->
        x=document.getElementById(objectId)
        return x.clientHeight
        
      pickerEvent=
        Init: (elemid)->
          if obj.year == -1
            dateUtil.getCurrent()
          for n of pickerHtml
            pickerHtml[n]()
          p=document.getElementById("calendar_choose") 
          if p
            document.body.removeChild(p)
          html='<div id="calendar_choose" class="calendar" style="display: block; position: absolute;">'
          html += htmlObj.header
          html += '<div class="basefix" id="bigCalendar" style="display: block;">'
          html += htmlObj.left
          html += htmlObj.right
          html += '<div style="clear: both;"></div>'
          html += "</div></div>"
          elemId=elemid
          elemObj=document.getElementById(elemid)
          $(document.body).append(html)
          document.getElementById("picker_last").onclick = pickerEvent.getLast
          document.getElementById("picker_next").onclick = pickerEvent.getNext
          #document.getElementById("picker_today").onclick = pickerEvent.getToday
          document.getElementById("calendar_choose").style.left = getAbsoluteLeft(elemid)+"px"
          document.getElementById("calendar_choose").style.top  = getAbsoluteTop(elemid)+"px"
          document.getElementById("calendar_choose").style.zIndex = 1000
          tds = document.getElementById("calendar_tab").getElementsByTagName("td")
          for n in tds
            if n.getAttribute("date") isnt null and n.getAttribute("date") isnt ''
              n.onclick= ->
                commonUtil.chooseClick(this)
      
        getLast: ->
          dateUtil.getLastDate()
          pickerEvent.Init(elemId)
        getNext: ->
          dateUtil.getNextDate()
          pickerEvent.Init(elemId)
        getToday: ->
          dateUtil.getCurrent()
          pickerEvent.Init(elemId)
        setPriceArr: (a,b,c)->
          obj.singlePriceArr=a
          obj.doublePriceArr=b
          obj.triplePriceArr=c
        remove: ->
          p=document.getElementById("calendar_choose") 
          if p!=null
            document.body.removeChild(p)
        isShow: ->
          p=document.getElementById("calendar_choose")  
          if p
            return true
          else 
            return false
      
      pickerHtml=
        getHead: ->
          head = '<div class="calendar_title"><a href="javascript:void()" title="上一月" id="picker_last" class="pkg_circle_top"><i class="fa fa-chevron-left"></i></a><span class="date_text">' + obj.year + '&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;' + obj.month + '&nbsp;&nbsp;&nbsp;月</span><a href="javascript:void()" title="下一月" id="picker_next" class="pkg_circle_bottom "><i class="fa fa-chevron-right"></i></a></div>'
          #head='<ul class="calendar_num basefix"><li class="bold">六</li><li>五</li><li>四</li><li>三</li><li>二</li><li>一</li><li class="bold">日</li><li class="picker_today bold" id="picker_today">回到今天</li></ul>'
          head+='<ul class="calendar_num basefix"><li>六</li><li>五</li><li>四</li><li>三</li><li>二</li><li>一</li><li>日</li></ul>'
          htmlObj.header = head
#        getLeft: ->
#          left = '<div class="calendar_left pkg_double_month"><p class="date_text">' + obj.year + '年<br>' + obj.month + '月</p><a href="javascript:void()" title="上一月" id="picker_last" class="pkg_circle_top">上一月</a><a href="javascript:void()" title="下一月" id="picker_next" class="pkg_circle_bottom ">下一月</a></div>'
#          htmlObj.left = left

        getRight: ->
          days = dateUtil.getLastDay()
          week = dateUtil.getWeek()  
          html = '<table id="calendar_tab" class="calendar_right"><tbody>' 
          index = 0
          for i in [1..36]
            if index==0 and (i-c) < days
              html += "<tr>"
            if week > 0 then c=week
            else
              c=0
            if (i - 1) >= week and (i - c) <= days
              priceObj = commonUtil.getPrice((i - c))
              singlePrice = ""
              doublePrice=""
              triplePrice=""
              classStyle = ""
              if priceObj.singlePrice !=-1
                singlePrice = "<span>单人间</span>¥" + priceObj.singlePrice
                doublePrice = "<span>双人间</span>¥" + priceObj.doublePrice
                triplePrice = "<span>三人间</span>¥" + priceObj.triplePrice
                classStyle = "class='on'"
              if priceObj.singlePrice != -1 and obj.year==new Date().getFullYear() and obj.month==new Date().getMonth()+1 and i-c==new Date().getDate()
                classStyle = "class='on today'"
              #判断今天
              if obj.year==new Date().getFullYear() and obj.month==new Date().getMonth()+1 and i-c==new Date().getDate()
                html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" singlePrice="' + priceObj.singlePrice + '" doublePrice="'+priceObj.doublePrice+'" triplePrice="'+priceObj.triplePrice+'"><span class="date basefix">今天</span>'
                if singlePrice!=0
                  html+='<span class="calendar_price01">' + singlePrice + '</span>'
                if doublePrice!=0
                  html+='<span class="calendar_price01">' + doublePrice + '</span>'
                if triplePrice!=0
                  html+='<span class="calendar_price01">' + triplePrice + '</span>'
                html+='</td>'
              else
                html += '<td  ' + classStyle + ' date="' + obj.year + "-" + obj.month + "-" + (i - c) + '" singlePrice="' + priceObj.singlePrice + '" doublePrice="'+priceObj.doublePrice+'" triplePrice="'+priceObj.triplePrice+'"><span class="date basefix">' + (i - c) + '</span>' 
                if singlePrice!=0
                  html+='<span class="calendar_price01">' + singlePrice + '</span>'
                if doublePrice!=0
                  html+='<span class="calendar_price01">' + doublePrice + '</span>'
                if triplePrice!=0
                  html+='<span class="calendar_price01">' + triplePrice + '</span>'
                html+='</td>'
              if index ==6
                html+='</tr>'
                index=-1
            else
              if (i-c) <= days
                html += "<td></td>"    
              if index == 6
                html+='</tr>'
                index=-1
            index++
          html += "</tbody></table>" 
          htmlObj.right = html
      dateUtil=
        #根据日期得到星期
        getWeek: ->
          d = new Date(obj.year, obj.month - 1, 1)
          return d.getDay()
        #得到一个月的天数
        getLastDay: ->
          #取得当前的年份
          new_year=obj.year
          #取下一个月的第一天，方便计算（最后一个不固定）
          new_month=obj.month
          #取当年当月中的第一天
          new_date=new Date(new_year,new_month,1)
          #获取当月最后一天日期
          return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate()  
        getCurrent: ->
          dt=obj.date
          obj.year=dt.getFullYear()
          obj.month=dt.getMonth()+1
          obj.day=dt.getDate()
        getLastDate: ->
          if obj.year == -1
            dt=new Date(obj.date)
            obj.year=dt.getFullYear()
            obj.month=dt.getMonth()+1
          else
            newMonth=obj.month-1
            if newMonth <=0
              obj.year-=1
              obj.month=12
            else
              newMonth=obj.month-1
              if newMonth<=0
                obj.year-=1
                obj.month=12
              else
                obj.month-=1
        getNextDate: ->
          if obj.year == -1
            dt=new Date(obj.date)
            obj.year=dt.getFullYear()
            obj.month=dt.getMonth()+1
          else
            newMonth=obj.month+1
            if newMonth>12
              obj.year+=1
              obj.month=1
            else
              obj.month+=1
      commonUtil=
        getPrice: (day)->
          dt = obj.year + "-"
          if obj.month<10
            dt += "0"+obj.month
          else
            dt+=obj.month
          if day<10
            dt += "-0" + day
          else
            dt += "-" + day
          priceObj=
            singlePrice:0
            doublePrice:0
            triplePrice:0
          for n in obj.singlePriceArr
            if n.Date == dt
              priceObj.singlePrice=n.Price
              break
          for n in obj.doublePriceArr
            if n.Date == dt
              priceObj.doublePrice=n.Price
              break
          for n in obj.triplePriceArr
            if n.Date == dt
              priceObj.triplePrice=n.Price
              break
          if priceObj.singlePrice ==0 and priceObj.doublePrice==0 and priceObj.triplePrice==0
            priceObj.singlePrice=-1
          return priceObj
        chooseClick: (sender)->
          scope.$apply ->
            scope.resultStayData.Date = sender.getAttribute("date")  
            scope.resultStayData.SingleRoomPrice = parseFloat(sender.getAttribute("singleprice")) 
            scope.resultStayData.DoubleRoomPrice = parseFloat(sender.getAttribute("doubleprice"))
            scope.resultStayData.TripleRoomPrice = parseFloat(sender.getAttribute("tripleprice")) 
          pickerEvent.remove()
          
      $(document).bind "click", ->
        e = event || window.event
        if e
          elem = e.srcElement || elem=e.target
        while elem
          if elem.id == "calendar_choose" or elem.id=="calendar"
              return
          elem = elem.parentNode
        pickerEvent.remove()
      $("#calendar").bind "click",->
       if scope.ngModel
        pickerEvent.setPriceArr(scope.ngModel.SingleRoomData,scope.ngModel.DoubleRoomData,scope.ngModel.TripleRoomData)
        pickerEvent.Init('calendar')  
        
      
            
])

