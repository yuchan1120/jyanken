import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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
    this.state = {scores: [], status: {}, tabIndex: 0}
  }
  componentDidMount() {
    this.getResult()
  }
  tabChange(ix) {
    this.setState({tabIndex: ix})
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
    const tabStyle = {width: 200, height: 50, color: '#fff', backgroundColor: '#01bcd4'}
    return (
        <div style={{marginLeft: 30}}>
          <Header>じゃんけん ポン！</Header>
          <JyankenBox actionPon={(te) => this.pon(te)} />
          <Paper style={{width: 400}}>
            <Tabs value={this.state.tabIndex} onChange={(event, ix) => this.tabChange(ix)}>
              <Tab label="対戦結果" value={0} style={tabStyle}/>
              <Tab label="対戦成績" value={1} style={tabStyle} />
            </Tabs>
            { this.state.tabIndex == 0 ? <ScoreList scores={this.state.scores} /> : null}
            { this.state.tabIndex == 1 ? <StatusBox status={this.state.status} /> : null}
          </Paper>
        </div>
    )
  }
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
  <JyankeGamePage/>,
  document.getElementById('root')
)
