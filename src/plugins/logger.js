function info(message) {
    console.log("%c" + "Message: %c" + message, "font-size:14px; color: #4fdee5;background:black;padding:8px;padding-right:0px", "font-size:14px;color:orange;font-weight:bold;background:black;padding:8px;padding-left:0px")
}

let logger = {};
logger["info"] = info;

const _logger = {};
Object.assign(_logger, logger);
_logger.install = function (app) {
    app.config.globalProperties.$logger = logger;
}

export default _logger;
