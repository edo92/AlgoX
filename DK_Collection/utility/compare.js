module.exports = (str1, str2) => {
    let check = {};

    if (str1 && str2) {
        if (editDistance(str1, str2) > 3) {
            str1.split(' ').map((s1, i) => {
                let s2 = str2.split(' ')[i];
                if (editDistance(s1, s2) > 3) {
                    check['fail'] = (check['fail'] || 0) + 1;
                }
            })
        }
    } else check.fail = 1;

    if (check.fail) return false;

    return true;

    function editDistance(s1, s2) {
        if (!s1 || !s2) return false;

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
}