const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const db = require('electron-db')
const fs = require('fs')

//setub DB
function DBsetter(dbname) {
	const location = path.join(__dirname, './config/datasets/')
	// const namesDb = 
	try {
		if (fs.existsSync(path.join(__dirname, `./config/datasets/${dbname}.json`))) {}
		else {db.createTable(`${dbname}`, location, (succ, msg) => {})}
	} catch(err) {console.error(err)}
}
DBsetter('names')
DBsetter('rehersalDates')
DBsetter('placesForContract')




let mainWindow

let isDev = false
const isMac = process.platform === 'darwin' ? true : false

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: isDev ? 1400 : 1100,
		height: 800,
		show: false,
		icon: `${__dirname}/assets/icon.png`,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', () => {
	createMainWindow()

	const mainMenu = Menu.buildFromTemplate(menu)
	Menu.setApplicationMenu(mainMenu)
})

const menu = [
	...(isMac ? [{ role: 'appMenu '}] : []),
	{
		role: 'fileMenu'
	},
	{
		role: 'editMenu'
	},
	{
		label: 'Προσθήκη', // αλλαγή ονόματος και λειτουργείας
		submenu: [
			{
				label: 'Προσθήκη νέου μουσικού',
				click: () => console.log('oxi akoma')
			}
		]
	},
	{
		label: 'Διαγραφή', // αλλαγή ονόματος και λειτουργείας
		submenu: [
			{
				label: 'Διαγραφή ονομάτων και προβών',
				click: () => deleteall()
			},
			{
				label: 'Διαγραφή τοποθεσιών',
				click: () => deleteall()
			}
		]
	},
	...(isDev
		? [
			{
				label: 'Developer',
				submenu: [
					{ role: 'reload'},
					{ role: 'forcereload'},
					{ role: 'separator'},
					{ role: 'toggledevtools'},
				]
			}
		]
	: [])
]

ipcMain.on('musicians:load', sendMusicians) 
ipcMain.on('logs:load', sendLogs)
ipcMain.on('names:load', sendNames)
ipcMain.on('places:load', sendPlaces)
ipcMain.on('PlacesForContract:load', sendPlacesForContract)
ipcMain.on('opuses:load', sendOpuses)
ipcMain.on('opusesData:load', sendOpusesData)
ipcMain.on('article1:load', sendArticle1)
ipcMain.on('article1Preview:load', sendArticle1Preview)

// Create log
ipcMain.on('logs:add', async (e, item) => {
	try { 
		db.insertTableContent('rehersalDates', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendLogs()
		})
	} catch (err) {
		console.log(err)
	}
})



// Create Name
ipcMain.on('names:add', async (e, item) => {
	try { 
		db.insertTableContent('names', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendNames()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create Musician
ipcMain.on('musicians:add', async (e, item) => {
	try { 
		db.insertTableContent('musiciansData', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendMusicians()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create Name
ipcMain.on('opuses:add', async (e, item) => {
	try { 
		db.insertTableContent('opuses', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendOpuses()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create Place
ipcMain.on('places:add', async (e, item) => {
	try { 
		db.insertTableContent('places', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendPlaces()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create placeForContract
ipcMain.on('placesForContract:add', async (e, item) => {
	try { 
		db.insertTableContent('placesForContract', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendPlacesForContract()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create article
ipcMain.on('article1:add', async (e, item) => {
	try { 
		db.insertTableContent('article1', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendArticle1()
		})
	} catch (err) {
		console.log(err)
	}
})

// Create articlePreview
ipcMain.on('article1Preview:add', async (e, item) => {
	try { 
		db.insertTableContent('article1Preview', path.join(__dirname, './config/datasets/'), item, (succ, msg) => {
			sendArticle1Preview()
		})
	} catch (err) {
		console.log(err)
	}
})

// Delete log
ipcMain.on('logs:delete', async (e, id) => {
	try {
		db.deleteRow('rehersalDates', path.join(__dirname, './config/datasets/'), {'id': id}, (succ, msg) => {
			sendLogs()
		})
	} catch (err) {
		console.log(err)
	}
})

// Delete place for Contract
ipcMain.on('placeForContract:delete', async (e, id) => {
	try {
		db.deleteRow('placesForContract', path.join(__dirname, './config/datasets/'), {'id': id}, (succ, msg) => {
			sendPlacesForContract()
		})
	} catch (err) {
		console.log(err)
	}
})

// Update log
ipcMain.on('logs:update', async (e, where, set) => {
	try {
		db.updateRow('rehersalDates', path.join(__dirname, './config/datasets/'), where, set, (succ, msg) => {
			sendLogs()
		})
	} catch (err) {
		console.log(err)
	}
})

// Update article1
ipcMain.on('article1:update', async (e, where, set) => {
	try {
		db.updateRow('article1', path.join(__dirname, './config/datasets/'), where, set, (succ, msg) => {
			sendArticle1()
		})
	} catch (err) {
		console.log(err)
	}
})

// Update name
ipcMain.on('nameEdit:update', async (e, where, set) => {
	try {
		db.updateRow('names', path.join(__dirname, './config/datasets/'), where, set, (succ, msg) => {
			sendNames()
		})
	} catch (err) {
		console.log(err)
	}
})

// Find name
// ipcMain.on('name:find', async (e, id) => {
// 	try {
		
// 		db.search('names', path.join(__dirname, './config/datasets/'), 'id', id,(succ, data) => {
// 			if (succ) {			
// 				mainWindow.webContents.send('name:found', data)
// 		  	}	
// 		})
// 	} catch (err) {
// 		console.log(err)
// 	}
// })



// Delete name
ipcMain.on('name:delete', async (e, id) => {
	try {
		db.deleteRow('names', path.join(__dirname, './config/datasets/'), {'id': id}, (succ, msg) => {
			sendNames()
		})
	} catch (err) {
		console.log(err)
	}
})

// Delete opus
ipcMain.on('opus:delete', async (e, id) => {
	try {
		db.deleteRow('opuses', path.join(__dirname, './config/datasets/'), {'id': id}, (succ, msg) => {
			sendOpuses()
		})
	} catch (err) {
		console.log(err)
	}
})

// Delete Preview
ipcMain.on('article1Preview:delete', async (e) => {
	try {
		db.clearTable('article1Preview', path.join(__dirname, './config/datasets/'), (succ, msg) => {
			sendArticle1Preview()
		})
	} catch (err) {
		console.log(err)
	}
})

// Delete Places and article 1
ipcMain.on('article1:delete', async (e) => {
	try {
		db.clearTable('article1', path.join(__dirname, './config/datasets/'), (succ, msg) => {
			sendArticle1()
		})
	} catch (err) {
		console.log(err)
	}
})


// Send log items
function sendLogs () {
	try {
		db.getAll('rehersalDates', path.join(__dirname, './config/datasets/'), (succ, logs) => {
			mainWindow.webContents.send('logs:get', logs)
		})	
	} catch (err) {
		console.log(err)
	}
}


// Send Opus items
function sendOpuses () {
	try {
		db.getAll('opuses', path.join(__dirname, './config/datasets/'), (succ, opuses) => {
			mainWindow.webContents.send('opuses:get', opuses)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send name items
function sendNames () {
	try {
		db.getAll('names', path.join(__dirname, './config/datasets/'), (succ, names) => {
			mainWindow.webContents.send('names:get', names)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send Musicians items
function sendMusicians () {
	try {
		db.getAll('musiciansData', path.join(__dirname, './config/datasets/'), (succ, musicians) => {
			mainWindow.webContents.send('musicians:get', musicians)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send OpusData items
function sendOpusesData () {
	try {
		db.getAll('opusesData', path.join(__dirname, './config/datasets/'), (succ, opusesData) => {
			mainWindow.webContents.send('opusesData:get', opusesData)
		})	
	} catch (err) {
		console.log(err)
	}
}


// Send article1 
function sendArticle1 () {
	try {
		db.getAll('article1', path.join(__dirname, './config/datasets/'), (succ, article1) => {
			mainWindow.webContents.send('article1:get', article1)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send article1Preview
function sendArticle1Preview () {
	try {
		db.getAll('article1Preview', path.join(__dirname, './config/datasets/'), (succ, article1Preview) => {
			mainWindow.webContents.send('article1Preview:get', article1Preview)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send place 
function sendPlaces () {
	try {
		db.getAll('places', path.join(__dirname, './config/datasets/'), (succ, places) => {
			mainWindow.webContents.send('places:get', places)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Send PlacesForContract items
function sendPlacesForContract () {
	try {
		db.getAll('placesForContract', path.join(__dirname, './config/datasets/'), (succ, placesForContract) => {
			mainWindow.webContents.send('placesForContract:get', placesForContract)
		})	
	} catch (err) {
		console.log(err)
	}
}

// Clear all logs
function clearLogs() {
	try {
		db.clearTable('rehersalDates', path.join(__dirname, './config/datasets/'), (succ, msg) => {
			mainWindow.webContents.send('logs:clear')
		})
	} catch (err) {
		console.log(err)
	}
}


// Clear all names
function clearNames() {
	try {
		db.clearTable('names', path.join(__dirname, './config/datasets/'), (succ, msg) => {
			mainWindow.webContents.send('names:clear')
			console.log(succ, msg)
		})
	} catch (err) {
		console.log(err)
	}
}

// Clear all names
function clearArticle1Preview() {
	try {
		db.clearTable('article1Preview', path.join(__dirname, './config/datasets/'), (succ, msg) => {
		})
	} catch (err) {
		console.log(err)
	}
}

// Clear places and article 1 Function
function clearArticle1() {
	try {
		db.clearTable('article1', path.join(__dirname, './config/datasets/'), (succ, msg) => {
		})
	} catch (err) {
		console.log(err)
	}
}

// Delete all
function deleteall() {
	clearLogs()
	clearNames()
	clearArticle1Preview()
	clearArticle1()
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
