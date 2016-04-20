angular.module('filters', []).filter('YesNo', function() {
  return function(input) {
    if (input === false) {
      return '否';
    } else if (input === true) {
      return '是';
    } else {
      return 'unknown';
    }
  };
}).filter('minutesToTime', function() {
  return function(input) {
    var hours, minutes, total_days, total_hours, total_minutes;
    if (!isNaN(input) && input !== null) {
      total_minutes = parseInt(input);
      minutes = total_minutes % 60;
      total_hours = (total_minutes - minutes) / 60;
      if (total_hours === 0) {
        return total_minutes + '分钟';
      }
      hours = total_hours % 24;
      total_days = (total_hours - hours) / 24;
      if (total_days === 0) {
        if (total_hours === 0) {
          return minutes + '分钟';
        } else if (minutes === 0) {
          return total_hours + '小时';
        } else {
          return total_hours + '小时' + minutes + '分钟';
        }
      } else {
        return total_days + '天' + total_hours + '小时' + minutes + '分钟';
      }
    } else {
      return '';
    }
  };
}).filter('subStr', function() {
  return function(input, length) {
    length = length || 20;
    if (input && input.length > length) {
      input = input.substr(0, length) + '...';
    }
    return input;
  };
}).filter('numCapital', function() {
  return function(input) {
    if (!isNaN(input)) {
      if (input === 1 || input === '1') {
        return '一';
      } else if (input === 2 || input === '2') {
        return '两';
      } else if (input === 3 || input === '3') {
        return '三';
      } else if (input === 4 || input === '4') {
        return '四';
      } else if (input === 5 || input === '5') {
        return '五';
      } else if (input === 6 || input === '6') {
        return '六';
      } else if (input === 7 || input === '7') {
        return '七';
      } else if (input === 8 || input === '8') {
        return '八';
      } else if (input === 9 || input === '9') {
        return '九';
      }
    }
  };
}).filter('orderStatus', function() {
  return function(input) {
    if (input === 'NotSigned') {
      return '未签约';
    } else if (input === 'Signed') {
      return '已签约';
    } else if (input === 'Cancelled') {
      return '已取消';
    } else if (input === 'Completed') {
      return '已完成';
    } else {
      return 'unknown';
    }
  };
}).filter('projectLearn', [
  '$sce', function($sce) {
    return function(input) {
      var html, htmlObj, i, len, n, ol, ref;
      ol = angular.element(input);
      html = '<ol>';
      ref = ol.children();
      for (i = 0, len = ref.length; i < len; i++) {
        n = ref[i];
        html += '<li><span class="purpose-ico"><img src="/image/project.ico.png" /></span><span class="purpose">' + n.textContent + '</span></li>';
      }
      html += '</ol>';
      htmlObj = angular.element(html);
      return $sce.trustAsHtml(htmlObj.prop("outerHTML"));
    };
  }
]).filter('ToPath', function() {
  return function(input) {
    var format, time;
    format = function(num) {
      if (parseInt(num) < 10) {
        return '0' + num;
      }
      return num;
    };
    if (input) {
      time = new Date(input);
      return time.getUTCFullYear() + '/' + format(parseInt(time.getUTCMonth()) + 1) + '/' + format(time.getUTCDate()) + '/' + format(time.getUTCHours()) + format(time.getUTCMinutes()) + format(time.getUTCSeconds());
    }
    return "";
  };
});

//# sourceMappingURL=filters.js.map
