const queryExecutor = ({ executorUseCase }) => async (req, res) => {
    try {
        const response = await executorUseCase(req.body);
        res.status(response?.code).json({
            message: response?.message
        });
    } catch (error) {
        res.status(500).json({
            message: error?.message
        });
    }
}

module.exports = {
    queryExecutor
}