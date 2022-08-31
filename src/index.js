import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Route,  Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Jyanken from './Jyanken'


class JyankeGamePage extends Component {
  constructor(props) {
    super(props)
    this.jyanken = new Jyanken()
    this.state = {scores: [], status: {}}
  }
  componentDidMount() {
    this.getResult()
  }
  getResult() {
    this.setState({scores: this.jyanken.getScores()})
    this.setState({status: this.jyanken.getStatuses()})
  }
  pon(te) {
    this.jyanken.pon(te)
    this.getResult()
  }
  render() {
    const tabStyle= {width: 200, height: 50, textAlign: 'center', color: '#fff', backgroundColor: '#01bcd4', borderRadius: 0}
    const activeStyle = (path) => Object.assign({borderBottom: `solid 2px ${this.props.location.pathname.match(path) ? '#f00' : '#01bcd4'}`}, tabStyle)
    return (
      <div style={{marginLeft: 30}}>
        <Header>じゃんけん ポン！</Header>
        <JyankenBox actionPon={(te) => this.pon(te)} />
        <Paper style={{width: 400}} zDepth={2}>
          <Link id="tab-scores" to="/scores" style={{textDecoration: 'none'}}><Button style={activeStyle('scores')}>対戦結果</Button></Link>
          <Link id="tab-status" to="/status" style={{textDecoration: 'none'}}><Button style={activeStyle('status')}>対戦成績</Button></Link>
          <Route path="/scores" component={() => <ScoreList scores={this.state.scores} />}/>
          <Route path="/status" component={() => <StatusBox status={this.state.status} />}/>
          <Route exact path="/" component={() => <Redirect to="/scores" />}/>
        </Paper>
      </div>
    )
  }
}
JyankeGamePage.propTypes = {
  location: PropTypes.object
}

const Header = (props) => (<h1>{props.children}</h1>)
Header.propTypes = {
  children: PropTypes.string
}

const StatusBox = (props) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell variant="head">勝ち</TableCell><TableCell style={judgmentStyle(1)}>{props.status.win}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">負け</TableCell><TableCell style={judgmentStyle(2)}>{props.status.lose}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">引き分け</TableCell><TableCell style={judgmentStyle(0)}>{props.status.draw}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
)
StatusBox.propTypes = {
  status: PropTypes.object
}

const JyankenBox = (props) => {
  const style = {marginLeft: 20}
  return (
    <div style={{marginTop: 40, marginBottom: 30, marginLeft: 50}}>
      <Button variant="contained" id="btn-guu" onClick={() => props.actionPon(0)} style={style}>グー</Button>
      <Button variant="contained" id="btn-choki" onClick={() => props.actionPon(1)} style={style}>チョキ</Button>
      <Button variant="contained" id="btn-paa" onClick={() => props.actionPon(2)} style={style}>パー</Button>
    </div>
  )
}
JyankenBox.propTypes = {
  actionPon: PropTypes.func
}

const ScoreList = (props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>時間</TableCell><TableCell>人間</TableCell><TableCell>コンピュータ</TableCell><TableCell>結果</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.scores.map((score, ix) => <ScoreListItem key={ix} score={score} />)}
    </TableBody>
  </Table>
)
ScoreList.propTypes = {
  scores: PropTypes.array
}

const ScoreListItem = (props) => {
  const teString = ["グー","チョキ", "パー"]
  const judgmentString = ["引き分け","勝ち", "負け"]
  const dateHHMMSS = (d) => d.toTimeString().substr(0, 8)
  return (
    <TableRow>
      <TableCell style={judgmentStyle(props.score.judgment)}>{dateHHMMSS(props.score.created_at)}</TableCell>
      <TableCell style={judgmentStyle(props.score.judgment)}>{teString[props.score.human]}</TableCell>
      <TableCell style={judgmentStyle(props.score.judgment)}>{teString[props.score.computer]}</TableCell>
      <TableCell style={judgmentStyle(props.score.judgment)}>{judgmentString[props.score.judgment]}</TableCell>
    </TableRow>
  )
}
ScoreListItem.propTypes = {
  score: PropTypes.object
}

const judgmentStyle = (judgment) => ({paddingRight: 16, color: ["#000", "#2979FF", "#FF1744"][judgment]})

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={JyankeGamePage}/>
  </BrowserRouter>,
  document.getElementById('root')
)
