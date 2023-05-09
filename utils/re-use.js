exports.options={
    definition:{
        openapi:"3.0.0",
        info:{
          title:"API Docs for Image-ecommerce",
          description:"It is full fledged documentation fro my backend personal project which is named Image-ecommerce and presently I am using this apis for my frontend which is in reactjs",
        },
        servers:[
            {
                url:"http://localhost:5000/"
            }
        ]
    },
    apis:["./routes/*.js"],
}


