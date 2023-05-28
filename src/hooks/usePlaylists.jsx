import { useEffect, useState } from 'react';
import getPlaylist from '../api';
import {get,save} from '../utils/Stroage';
 

const INT_STATE={
	playlists: {},
	recentPlaylists: [],
	favorites: [],
}

const StroageKey = 'cy__playlist__state'
const usePlaylists = () => {
	const [state, setState] = useState(INT_STATE);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		const state = get(StroageKey)
		
		if (state) {
			setState({ ...state })
		}
	}, [])
	useEffect(() => {
		if(state!==INT_STATE)
		save(StroageKey, state)
	}, [state])

	const getPlaylistById = async (playlistId, force = false) => {
		if (state.playlists[playlistId] && !force) {
			return;
		}

		setLoading(true);
		try {
			const playlist = await getPlaylist(playlistId);
			setError('');
			setState((prev) => ({
				...prev,
				playlists: {
					...prev.playlists,
					[playlistId]: playlist,
				},
			}));
		} catch (e) {
			setError(e.response?.data?.error?.message || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const addToFavorites = (playlistId) => {
		setState((prev) => ({
			...prev,
			favorites: [...prev, playlistId],
		}));
	};
	const addToRecent = (playlistId) => {
		setState((prev) => ({
			...prev,
			recentPlaylists: [...prev, playlistId],
		}));
	};
	const getPlaylistsByIds = (ids = []) => {
		return ids.map((id) => state.playlists[id]);
	};
	return {
		playlists: state.playlists,
		favorites: getPlaylistsByIds(state.favorites),
		recentPlaylists: getPlaylistsByIds(state.recentPlaylists),
		error,
		loading,
		getPlaylistById,
		addToRecent,
		addToFavorites,
	};
};
export default usePlaylists;