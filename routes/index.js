const rest = require('../rest');

module.exports = (app) => {
    // api
    app.get('/api/:action/:target', (req, res) => {
        let { action, target } = req.params;

        let api = rest.api[action][target];
        api(req, data => {
            res.status(200).json(data);
        })
    })

    // Engine
    app.post('/engine/:action/:target', (req, res) => {
        let { action, target } = req.params;

        let api = rest.engine[action][target];
        api(req, data => {
            res.status(200).json(data);
        })
    })

    app.delete('/engine/:action/:target/:id', (req, res) => {
        let { action, target } = req.params;

        let api = rest.engine[action][target];
        api(req, data => {
            res.status(200).json(data);
        })
    })
}