const errorMiddleware = (
err,
req,
res,
next
) => {
console.error(err);

res.status(
err.statusCode || 500
).json({
error:
err.message ||
"Erro interno do servidor",
});
};

export default errorMiddleware;
