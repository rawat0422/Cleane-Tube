import axios from 'axios';

const key = import.meta.env.VITE_API_KEY;

const getPlaylistItem = async (playlistID, pageToken = '', result = []) => {
	const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistID}&key=${key}&pageToken=${pageToken}`;

	const { data } = await axios.get(URL);
	result = [...result, ...data.items];
	if (data.nextPageToken) {
		result = getPlaylistItem(playlistID, data.nextPageToken, result);
	}
	return result;
};


const getPlaylist = async (playlistID) => {
	const URl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistID}&key=${key}`
	const { data } = await axios.get(URl)
	let playlistItems = await getPlaylistItem(playlistID)
	console.log(playlistItems)


	const {
		title: playlistTitle,
		description: playlistDescription,
		thumbnails,
		channelId,
		channelTitle,
	} = data?.items[0]?.snippet;

	playlistItems = playlistItems.map((item) => {
		const {
			title,
			description,
			thumbnails: { high },
		} = item.snippet;

		return {
			title,
			description,
			thumbnail: high,
			contentDetails: item.contentDetails,
		};
	});

	return {
		playlistID,
		playlistTitle,
		playlistDescription,
		playlistThumbnail: thumbnails.default,
		channelId,
		channelTitle,
		playlistItems,
	};
}

export default getPlaylist;
