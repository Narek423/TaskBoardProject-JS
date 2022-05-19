import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function App() {
	return (
		<>
			<Stack direction='row' spacing={2}>
				<Button variant='outlined' startIcon={<DeleteIcon />}>
					Delete
				</Button>
				<Button variant='contained' endIcon={<SendIcon />}>
					Send
				</Button>
			</Stack>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
				</header>
			</div>
		</>
	);
}

export default App;
