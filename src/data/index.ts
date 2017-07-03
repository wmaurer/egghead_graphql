const videoA = {
    id: 'a',
    title: 'Create a GraphQL server',
    duration: 180,
    released: true
};

const videoB = {
    id: 'b',
    title: 'Learn the latest Cycle.js',
    duration: 120,
    released: false
};

const videos = [videoA, videoB];

export const createVideo = ({ title, duration, released }: { title: string; duration: number; released: boolean }) => {
    const video = {
        id: new Buffer(title, 'utf8').toString('base64'),
        title,
        duration,
        released
    };

    videos.push(video);

    return video;
};

export const getVideos = () =>
    new Promise(resolve => {
        resolve(videos);
    });

export const getVideoById = (id: string) =>
    new Promise(resolve => {
        const [video] = videos.filter(v => v.id === id);
        resolve(video);
    });
