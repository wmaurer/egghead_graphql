const videoA = {
    id: 'a',
    title: 'Create a GraphQL server',
    duration: 180,
    watched: true
};

const videoB = {
    id: 'b',
    title: 'Learn the latest Cycle.js',
    duration: 120,
    watched: false
};

const videos = [videoA, videoB];

export const getVideoById = (id: string) =>
    new Promise(resolve => {
        const [video] = videos.filter(v => v.id === id);
        resolve(video);
    });
