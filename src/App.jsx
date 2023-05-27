
import { Container, CssBaseline, Grid } from '@mui/material';
import Navbar from './components/navbar';
import usePlaylists from './hooks/usePlaylists';
import PlaylistCardItem from './components/playlist-card-item';

const App = () => {
	const {getPlaylistById,playlists,error,}=usePlaylists()

	const playlistArray=Object.values(playlists)
	console.log(playlistArray)
	return <>
	<CssBaseline/>
	<Container maxWidth={'lg'} sx={{ my: 16 }}>
	<div>
		<Navbar getPlaylistById={getPlaylistById} />
		{playlistArray.length > 0 && (
					<Grid container alignItems="stretch">
						{playlistArray.map((item) => (
							<Grid item xs={12} md={6} lg={4} mb={2}>
								<PlaylistCardItem
									key={item.id}
									playlistThumbnail={item.playlistThumbnail}
									playlistTitle={item.playlistTitle}
									channelTitle={item.channelTitle}
								/>
							</Grid>
						))}
					</Grid>
				)}
	</div>
	</Container>

	</>
};

export default App;
