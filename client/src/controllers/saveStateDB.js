/* Saves filter & application states into MongoDB for a User */
const saveStateDB = async (filter, user, applications) => {
  /*  Read environment variables:
        .env is used when app is deployed from local environment. ex. using npm start
        .env.production is used when app is deployed from a static build. */
  const env = process.env.REACT_APP_ENV || ''; 

  // Save to MongoDB
  const response = await fetch(env+"/savestate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userID: user._id, filter: filter, applications: applications}),
  })
}

export default saveStateDB;