const os = [
    { name: "Windows Phone", value: "Windows Phone", version: "OS" },
    { name: "Windows", value: "Win", version: "NT" },
    { name: "iPhone", value: "iPhone", version: "OS" },
    { name: "iPad", value: "iPad", version: "OS" },
    { name: "Kindle", value: "Silk", version: "Silk" },
    { name: "Android", value: "Android", version: "Android" },
    { name: "PlayBook", value: "PlayBook", version: "OS" },
    { name: "BlackBerry", value: "BlackBerry", version: "/" },
    { name: "Macintosh", value: "Mac", version: "OS X" },
    { name: "Linux", value: "Linux", version: "rv" },
    { name: "Palm", value: "Palm", version: "PalmOS" }
]

export default class DeviceUtils {

    static deviceName = (): string => {
        const userAgent = navigator.userAgent;
        let i: number,
            j = 0,
            regex,
            regexv,
            match,
            matches: any,
            version;

        for (i = 0; i < os.length; i += 1) {
            regex = new RegExp(os[i].value, "i");
            match = regex.test(userAgent);
            if (match) {
                regexv = new RegExp(os[i].version + "[- /:;]([\d._]+)", "i");
                matches = userAgent.match(regexv);
                version = "";
                if (matches) {
                    if (matches[1]) {
                        matches = matches[1];
                    }
                }
                if (matches) {
                    matches = matches.split(/[._]+/);
                    for (j = 0; j < matches.length; j += 1) {
                        if (j === 0) {
                            version += matches[j] + ".";
                        } else {
                            version += matches[j];
                        }
                    }
                } else {
                    version = "0";
                }
                return `${os[i].name} ${parseFloat(version)}`;
            }
        }

        return "unknown";
    }


    static deviceVersion = (): string => {
        const ua = navigator.userAgent;
        let tem;
        let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return "IE " + (tem[1] || "");
        }
        if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(" ");
    }


}