import assert  from 'assert'
import Jyanken from '../src/Jyanken'


describe('Jyanken', () => {
  const jyanken = new Jyanken()

  describe('勝敗の判定が正しいか', () => {
    describe('コンピュターがグーの場合', () => {
      it ('人間がグーなら引き分け', () => {
        jyanken.pon(0, 0)
        assert.equal(jyanken.getScores()[0].judgment, 0)
      })
      it ('人間がチョキなら負け', () => {
        jyanken.pon(1, 0)
        assert.equal(jyanken.getScores()[0].judgment, 2)
      })
      it ('人間がパーなら勝ち', () => {
        jyanken.pon(2, 0)
        assert.equal(jyanken.getScores()[0].judgment, 1)
      })
    })

    describe('コンピュターがチョキの場合', () => {
      it ('人間がグーなら勝ち', () => {
        jyanken.pon(0, 1)
        assert.equal(jyanken.getScores()[0].judgment, 1)
      })
      it ('人間がチョキなら引き分け', () => {
        jyanken.pon(1, 1)
        assert.equal(jyanken.getScores()[0].judgment, 0)
      })
      it ('人間がパーなら負け', () => {
        jyanken.pon(2, 1)
        assert.equal(jyanken.getScores()[0].judgment, 2)
      })
    })

    describe('コンピュターがパーの場合', () => {
      it ('人間がグーなら負け', () => {
        jyanken.pon(0, 2)
        assert.equal(jyanken.getScores()[0].judgment, 2)
      })
      it ('人間がチョキなら勝ち', () => {
        jyanken.pon(1, 2)
        assert.equal(jyanken.getScores()[0].judgment, 1)
      })
      it ('人間がパーなら引き分け', () => {
        jyanken.pon(2, 2)
        assert.equal(jyanken.getScores()[0].judgment, 0)
      })
    })
  })
})
