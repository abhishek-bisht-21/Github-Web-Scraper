const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issue");

function getReposPageHtml(url,topic){
	request(url,cb);
		function cb(err,response,html){
			if(err){
				console.log(err);
			}else if (response.statusCode == 404) {
         		   console.log("page not found");
        		}	
			else{
				getReposLink(html);
			}
		}

	function getReposLink(html){

		let $ = cheerio.load(html);
		let headingsArr = $(".f3.color-text-secondary.text-normal.lh-condensed");

		// Under each topic we will have 8 of its repos listed down.
  	      	console.log(topic);

        	for (let i = 0; i < 8; i++) {
          	  let twoAnchors = $(headingsArr[i]).find("a");
		     // at twoAnchors[0] We will have user's id who created that repo. 
		     // We only wanted the repo name so we did twoAnchors[1]
           	  let link = $(twoAnchors[1]).attr("href");
            	  // console.log(link);
            	  let fullLink = `https://github.com${link}/issues`;
            	  // console.log(fullLink);
		  // split returns an array by splitting but we are also using pop function, so it will pop out the
		  // last elem in the array and return us the element.
             	  let repoName = link.split("/").pop();

            	  getIssuesPageHtml(fullLink, topic,repoName);
        	}

        	console.log("````````````````````````````");
	}

}

module.exports = getReposPageHtml;