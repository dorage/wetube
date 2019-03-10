import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';
import { registerView } from './apiController';

export const home = async (req, res) => {
    // 과정이 끝나기를 기다림 / await 키워드는 async 없이는 사용불가
    // 성공/실패 여부 상관없이 넘어가므로 try/catch 로 잡아주는게 좋음
    try {
    // 새로운 비디오가 홈화면에서 우선순위를 가짐
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render('home', { pageTitle: 'Home', videos });
    } catch (error) {
        console.log(error);
        res.render('home', { pageTitle: 'Home', videos: [] });
    }
};

export const search = async (req, res) => {
    // const searchingBy = req.query.term;
    // ES6의 방식
    const {
        query: { term: searchingBy },
    } = req;

    let videos = [];
    try {
        videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
    } catch (error) {
        console.log(error);
    }
    res.render('Search', {
        pageTitle: 'Search',
        searchingBy,
        videos,
    });
};

export const getUpload = (req, res) => {
    res.render('upload', { pageTitle: 'Upload' });
};
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path },
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id)
            .populate('creator')
            .populate('comments');
        registerView(id);
        res.render('videoDetail', { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator !== req.user.id) {
            throw Error();
        } else {
            res.render('editvideo', { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({ _id: id });
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

// API
export const postRegisterView = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user,
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id,
        });
        video.comments.push(newComment.id);
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};
