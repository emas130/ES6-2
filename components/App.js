App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        let self = this;
        this.getGif(searchingText)
        .then( (gif) => {
            self.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        })
        .catch( (error) => console.log(error) );
    },
    getGif: (searchingText) => {
        return new Promise (
            (resolve, reject) => {
                let GIPHY_API_URL = 'https://api.giphy.com',
                    GIPHY_PUB_KEY = 'F0FsZaoH8UKVlEJtBVWIlxR8JqGTJyNc',
                    url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText,
                    xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText).data,
                        gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject(new error(this.statusText));
                    }
                };
                xhr.send();
            }
        );
    },
    render: function() {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif loading={this.state.loading} url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl}/>
          </div>
        );
    }
});