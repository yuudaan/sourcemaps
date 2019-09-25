exports.verifyHeader = ctx => {
    if (ctx.headers['user-agent']) {
        ctx.status = 404;
        return;
    }
    ctx.status = 302;
    ctx.redirect(`http://cdn.dancf.com/odyssey-editor${ctx.url}`);
};
