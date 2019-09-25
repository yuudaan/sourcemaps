exports.verifyHeader = ctx => {
    if (ctx.headers['x-real-ip'] === '218.17.158.233') {
        ctx.status = 302;
        ctx.redirect(`http://cdn.dancf.com/odyssey-editor/sourcemaps${ctx.url}`);
    }
};
