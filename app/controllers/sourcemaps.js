const SentryHeader = 'x-sentry-token';
exports.verifyHeader = ctx => {
    if (ctx.headers[SentryHeader] === 'a668d1a891a911e98d19965914fd28fc') {
        ctx.status = 302;
        ctx.redirect(`http://cdn.dancf.com/odyssey-editor/${ctx.url}`);
    }
};
