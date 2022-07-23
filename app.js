const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

//DB INIT ... CHANGE YOUR CREDENTIALS IN THE DB_CONFIG OBJECT!

const { Sequelize } = require('sequelize');

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  table: 'pathfinder',
  port: 3306,
}

const sequelize = new Sequelize(
  `mysql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.table}`
);

sequelize
  .authenticate()
  .then(() => {
    console.log('=====================================');
    console.log(`Connected to mysql table: ${DB_CONFIG.table}`);
    console.log('=====================================');
  })
  .catch(err => console.log(err));

const { QueryTypes } = require('sequelize');

sequelize
  .query("SELECT * FROM `users`", { type: QueryTypes.SELECT })
  .then(userData => {
    console.log('Database users:');
    userData.forEach((user, index) => {
      index++;
      console.log(`${index}. ${user.username}`);
    })
  });