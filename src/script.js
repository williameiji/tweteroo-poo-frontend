let _username = "";

class Auth {
	username;
	picture;

	constructor() {
		this.username = document.querySelector("#username").value;
		this.picture = document.querySelector("#picture").value;
	}

	signUp() {
		axios
			.post("http://localhost:5000/sign-up", {
				username: this.username,
				avatar: this.picture,
			})
			.then(() => {
				_username = this.username;
				new Tweet().getTweets();
			})
			.catch((err) => {
				console.error(err);
				alert("Erro ao fazer cadastro! Consulte os logs.");
			});
	}
}

class Tweet {
	getTweets() {
		axios.get("http://localhost:5000/tweets").then((res) => {
			const tweets = res.data;
			let tweetsHtml = "";

			for (const tweet of tweets) {
				tweetsHtml += `
        <div class="tweet">
          <div class="avatar">
            <img src="${tweet.avatar}" />
          </div>
          <div class="content">
            <div class="user">
              @${tweet.username}
            </div>
            <div class="body">
              ${this.escapeHtml(tweet.tweet)}
            </div>
          </div>
        </div>
      `;
			}

			document.querySelector(".tweets").innerHTML = tweetsHtml;
			document.querySelector(".pagina-inicial").classList.add("hidden");
			document.querySelector(".tweets-page").classList.remove("hidden");
		});
	}

	postTweet() {
		const tweet = document.querySelector("#tweet").value;

		axios
			.post("http://localhost:5000/tweets", {
				username: _username,
				tweet,
			})
			.then(() => {
				document.querySelector("#tweet").value = "";
				this.getTweets();
			})
			.catch((err) => {
				console.error(err);
				alert("Erro ao fazer tweet! Consulte os logs.");
			});
	}

	escapeHtml(unsafe) {
		return unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
}
