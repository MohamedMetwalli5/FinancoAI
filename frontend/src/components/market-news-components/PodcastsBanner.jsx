import { useContext } from 'react';
import { AppContext } from '../../AppContext.jsx';



const PodcastsBanner = () => {
    const { spotifyPodcasts } = useContext(AppContext);

    return (
        <div className="flex flex-row p-4 bg-green-500 rounded-lg m-1 justify-around">
            {spotifyPodcasts.map((podcast, index) => (
                <div key={index} className="flex-1 border-r last:border-0 border-gray-300 mx-2">
                    <a
                        href={podcast.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-lg font-bold hover:underline"
                    >
                        {podcast.name}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default PodcastsBanner;