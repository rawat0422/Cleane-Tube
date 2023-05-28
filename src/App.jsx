import Typography from '@mui/material/Typography';
import { Container, CssBaseline, Grid } from '@mui/material';
import Navbar from './components/navbar';
import usePlaylists from './hooks/usePlaylists';
import PlaylistCardItem from './components/playlist-card-item';
import { BrowserRouter, useParams,Route,Routes} from 'react-router-dom';

const HomePage = ({playlistArray}) => {
	
	return (
		<Container maxWidth={'lg'} sx={{ my: 16 }}>


			{playlistArray.length > 0 && (
				<Grid container alignItems="stretch">
					{playlistArray.map((item) => (
						<Grid item xs={12} md={6} lg={4} mb={2}>
							<PlaylistCardItem
								key={item.id}
								playlistThumbnail={item.playlistThumbnail}
								playlistTitle={item.playlistTitle}
								channelTitle={item.channelTitle}
								playlistId={item.playlistID}
							/>
						</Grid>
					))}
				</Grid>
			)}

		</Container>

	)

}
const PlayerPage=({playlists})=>{
	console.log('this is playlist ',playlists)
	const {playlistId}=useParams()
	console.log(playlistId)
	const current=playlists[playlistId]
	console.log('Current course -->',current)
	return (
		<Container maxWidth={'lg'} sx={{ my: 16 }}>
			<Typography variant="h2" align="center">
				{current.playlistTitle}
			</Typography>
			<Typography variant="body1">{current.playlistDescription}</Typography>
		</Container>
	
	 	
	)
}

const NotFound = () => {
	return (
		<Container maxWidth={'lg'} sx={{ my: 16 }}>
			<Typography variant="h2" align="center">
				404 Page Not Found!
			</Typography>
		</Container>
	);
};

const App = () => {
	const { getPlaylistById, playlists, error, } = usePlaylists()

	const playlistArray = Object.values(playlists)



	
	return <>
	<BrowserRouter>
		<CssBaseline />
		<Navbar getPlaylistById={getPlaylistById} />
		<Routes>
			<Route path='/' element={<HomePage playlistArray={playlistArray}/>} />
			<Route path='/player/:playlistId' element={<PlayerPage playlists={playlists}/>} />
			<Route path='*' element={<NotFound/>} />
		</Routes>

		</BrowserRouter>
		

	</>
};

export default App;
