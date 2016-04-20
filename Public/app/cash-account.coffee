angular.module('cash-account',[])
.filter('bank'
  ->
   (input)->
    if input is 'abc'
     return '中国农业银行'
    else if input is 'boc'
      return '中国银行'
    else if input is 'bocom'
      return '中国交通银行'
    else if input is 'ccb'
      return '中国建设银行'
    else if input is 'cmbc'
      return '中国招商银行'
    else if input is 'icbc'
      return '中国工商银行'
    else
      return 'unknown'
)
.controller('CashAccountCtrl',[
  '$scope','accountSvc','apiService','user','md5'
  ($scope,accountSvc,apiService,user,md5)->
    $scope.user=user
    $scope.menuName='extension'
    $scope.subMenuName='CashAccount'
    $scope.thumbUrl=apiService.thumbUrl
    bankReg=/^(\d{16}|\d{19})$/
    #获取账户信息
    getAccount=->
     accountSvc.query(user.ID).then (data)->
      for n in data
        if n.Type is 'BankPay'
          $scope.bankAccount=n
        else  
          $scope.aliAccount=n
    getAccount()

    
    #添加支付账户
    $scope.createAccount=(type)->
      $scope.frmValid=true
      request=
        'UserID':user.ID
      if type is 'BankPay'
        if !$scope.frmBank.$valid
          $scope.frmBank.submitted=true
          return
        request.Account=$scope.bAccount
        request.AccountName=$scope.bAccountName
        request.BankName=$scope.bankName
        request.Type=type
      else
        if !$scope.frmAli.$valid
          $scope.frmAli.submitted=true
          return
        request.Account=$scope.aAccount
        request.AccountName=$scope.aAccountName
        request.Type=type
      $scope.creating=true
      accountSvc.create(request).then((data)->
        getAccount()
        $scope.bankEdited=false
        $scope.aliEdited=false
        $scope.creating=false
      ).error (data)->
        $scope.creating=false
        if type is 'BankPay'
          $scope.bankError=data.Message
        else
          $scope.aliError=data.Message
        
    #点击添加
    $scope.addAccount=(type)->
      $scope.createBtn=true
      $scope.updateBtn=false
      if type is 'bankPay'
        $scope.bankEdited=true 
      else
        $scope.aliEdited=true 
      
    #点击取消
    $scope.cancel=(type)->
      if type is 'bankPay'
        $scope.bankEdited=false
      else
        $scope.aliEdited=false
    #点击修改
    $scope.updateEvent=(type)->
      $scope.updateBtn=true
      $scope.createBtn=false
      $scope.bAccount=null
      $scope.bAccountName=null
      $scope.bankName=null
      $scope.aAccount=null
      $scope.aAccountName=null
      if type is 'bankPay'
        $scope.bankEdited=true
      else
        $scope.aliEdited=true
        
    #修改支付账户
    $scope.updateAccount=(type)->
      request={}
      if type is 'BankPay'
        if !$scope.frmBank.$valid
          $scope.frmBank.submitted=true
          return
        request.ID=$scope.bankAccount.ID
        request.Account=$scope.bAccount
        request.AccountName=$scope.bAccountName
        request.BankName=$scope.bankName
        request.Type=type
      else
        if !$scope.frmAli.$valid
          $scope.frmAli.submitted=true
          return
        request.ID=$scope.aliAccount.ID
        request.Account=$scope.aAccount
        request.AccountName=$scope.aAccountName
        request.Type=type
      $scope.updating=true
      accountSvc.update(request).then (data)->
        getAccount()
        $scope.bankEdited=false
        $scope.aliEdited=false
        $scope.updating=false
       ,(data)->
        $scope.updating=false
        if type is 'BankPay'
          $scope.bankError=data.Message
        else
          $scope.aliError=data.Message
])
