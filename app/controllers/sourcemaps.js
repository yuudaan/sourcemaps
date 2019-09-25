exports.verifyHeader = ctx => {
    ctx.status = 302;
    ctx.redirect(`http://cdn.dancf.com/odyssey-editor${ctx.url}`);
};
