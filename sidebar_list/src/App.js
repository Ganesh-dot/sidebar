import React ,{Component} from "react";
import { BrowserRouter as Router , Link , Route } from "react-router-dom";

export default class App extends Component {

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
      <Router>
      <Root>
        <sidebar>
          {gists ? (
            gists.map(gist => (
              <sidebarItem key={gist.id}>
                <Link to={`/g/${gist.id}`}>
                 {gist.description || "[no description]"}
                </Link>
              </sidebarItem>
            ))
          ) : (
            <div> Loading... </div> 
          )}
        </sidebar>
        <main>
           <Route exact={true} path="/" render={() => (
           <h1>Welcome</h1>
          )}/>
            {gists && (
             <Route path="/g/:gistId" render= {({ match }) => (
             <Gist gist={gists.find(g => g.id === match.params.gistId )} /> )}/>
           )}
        </main>
      </Root>
      </Router>
    )
  }
}


const Gist = ({ gist }) => {
  console.log(gist)
  return(
    <div>
      <h1>{gist.description || "No Description"}</h1>
      <ul>
        {Object.key(gist.files).map(key => (
          <li>
            <b>{key}</b>
            <LoadFile url={gist.files[key].raw_url}>
              {(text) => (
                <pre>
                  {text}
                </pre>
              )}
            </LoadFile>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Root = ( props ) => (
  <div style={{
    display: "flex"
  }} {...props} />
)

const sidebar = ( props ) => (
  <div style={{
    width: "33vw",
    height: "100vh",
    overflow: "auto",
    background: "#eee"
  }} {...props} />
)
const sidebarItem = ( props ) => (
  <div style={{
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "5px 10px"
  }} {...props} />
) 

const main = ( props ) => (
  <div style={{
     flex: "1",
     height: "100vh",
     overflow: "auto"
  }}>

  <div style={{ 
     padding:"20px" 
  }} {...props} /> </div>
)