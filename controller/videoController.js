import routes from "../routes"
import Video from "../models/Video"

export const home = async (req, res) =>
{
    // 과정이 끝나기를 기다림 / await 키워드는 async 없이는 사용불가
    // 성공/실패 여부 상관없이 넘어가므로 try/catch 로 잡아주는게 좋음
    try{
        const videos = await Video.find({});
        res.render("home", {pageTitle : "Home", videos});
    } 
    catch(error)
    {
        console.log(error);
        res.render("home", {pageTitle : "Home", videos: []});
    }
};

export const search = (req, res) => 
{
    // const searchingBy = req.query.term;
    // ES6의 방식
    const 
    {
        query: {term : searchingBy}
    } = req;

    res.render("Search", {pageTitle : "Search", searchingBy : searchingBy, videos})
};

export const getUpload = (req, res) => 
{
    res.render("upload", {pageTitle : "Upload"})
};
export const postUpload = (req, res) => 
{
    const
    {
        body:{file, title, description}
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(123123));
};

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "Delete Video"});
