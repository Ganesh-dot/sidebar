import React, { Component } from "react"
import { BrowserRouter as Router , Link }

class App extends Component {
  state = {
    gists: null
  }

  componentDidMount(){
    fetch("https://api.github.com/gists")
    .then(res => res.json())
    .then(gists => {
      this.setState({ gists })
    })
  }

  render() {
    const { gists } = this.state
    return(
      <Root>
        <sidebar>
          {gists ? (
            gists.map(gist => (
              <sidebarItem key={gist.id}>
                <Link>
                 {gist.description || "[no description]"}
                </Link>
              </sidebarItem>
            ))
          ) : (
            <div> Loading... </div> 
          )}
        </sidebar>
        <main>
          <h1>Welcome</h1>
        </main>
      </Root>
    )
  }
}