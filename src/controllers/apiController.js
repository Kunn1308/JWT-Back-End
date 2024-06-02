const TestApi = (req, res) => {
    res.status(200).json({ message: "ok", data: "test api" });
};

const handleSignup = async (req, res) => {
    console.log(req.body);
    res.json(req.body);
};

export default {
    TestApi,
    handleSignup,
};
