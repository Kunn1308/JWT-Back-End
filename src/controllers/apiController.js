const TestApi = (req, res) => {
    res.status(200).json({ message: "ok", data: "test api" });
};

export default {
    TestApi,
};
