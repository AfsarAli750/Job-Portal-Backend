import getHomeDB from "../repository/Home"


const homeService = async()=>{
    const obj = await getHomeDB()
    return obj
}

export default homeService