'use strict'
const report = {
  'story stages': [
    {
      id: 6,
      title: '寝ても覚めても',
      desc: '酒場でコーディとの会話イベント後、酔って寝ていたはずのトマスたちが再び元気にポーカーしている。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711761805289410592']
    },
    {
      id: 7,
      title: '開発主任ルーポの迷言',
      desc: '非破損状態で試作型を運用したにも関わらず「２パーツ破損しましたね」と言われる。（報酬は非破損と同じ額出る）',
      img: ['https://twitter.com/NEKOSANN_08/status/1712113057185644894']
    },
    {
      id: 10,
      title: '謎の倉庫係',
      desc: 'ショップに立ち入った一瞬しか顔をみせない。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712434552961171737']
    },
    {
      id: 11,
      title: '非加入メンバーの強制加入、アイテム・所持金などの消失',
      desc: 'ステージ依存ではない可能性もあり。\nネットワーク利用による特殊機体（シャカールBなど）の取得が関わってる可能性大。\n発生すると消耗アイテムと装備品以外消失する。バグ加入したメンバーは次ステージ以降使用できない。（現地闘技場は使用可能）',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1712474064781250816',
        'https://twitter.com/NEKOSANN_08/status/1712478916898963937',
        'https://twitter.com/NEKOSANN_08/status/1712875619544190997',
        'https://twitter.com/NEKOSANN_08/status/1712879270039797868'
      ]
    },
    {
      id: 20,
      title: 'ドゥカンディショップから強制ワープ、イベント処理不具合など多数',
      desc: 'このステージの期間中ドゥカンディショップに出入りするとノトゥンクミラへ強制ワープする。\nこの時にノトゥンクミラの隠し闘技場イベントが完了していないと街から出られなくなる現象あり。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713454961529590108',
        // 'https://twitter.com/NEKOSANN_08/status/1713468345092334067',
        // 'https://twitter.com/NEKOSANN_08/status/1713468977840816464'
      ]
    },
    {
      id: 20,
      title: 'ノトゥンクミラの隠し闘技場イベントで街から出られなくなる',
      desc: 'マスターに話しかけ隠し闘技場を案内されているまでの間、マスターから謎のメッセージが発せられ街から出られなくなる。\n選択項目に表示されるようになった闘技場に行きイベントを完遂すれば出られるようになる。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713452189321204143',
        'https://twitter.com/NEKOSANN_08/status/1713453331312672829',
      ]
    },
    {
      id: 22,
      title: '戦闘中会話イベントによるスタック',
      desc: 'イベント後カメラ操作以外スタックする、イベント直前に中断セーブをセット、再スタートすることにより回避可能。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713544536499331094'
      ]
    },
    {
      id: 23,
      title: '３部隊編成時の表示不具合、街イベントフラグメントの不具合など',
      desc: '３部隊編成時のステータス表示で格闘のレベル表記がおかしい。\nこの時期に発生するはずのロッキーからの呼び出しイベントはそれ自体が発生しない。（誘われはする）\n部隊編成操作をするとグレニー関連の一部会話イベントが復活する。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713870856961794059',
        'https://twitter.com/NEKOSANN_08/status/1713871981467271352',
        'https://twitter.com/NEKOSANN_08/status/1713872614232621477'
      ]
    },
    {
      id: 24,
      title: 'ロード完了時に銃撃音',
      desc: 'その他のステージでは未確認。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713900401261715814'
      ]
    },
    {
      id: 24,
      title: 'フェンリルが格納されているとされる倉庫を開放するとシーン完了後に操作がスタックする',
      desc: 'この現象のため一部限定アイテムが取得不可能。\n2023/10/19に修正アップデートv1.0.3の配布。公式よりこのステージの修正が入ったとのお知らせあり。現在確認中...',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713896153761390756',
      ]
    },
    {
      id: 24,
      title: 'バーグショミティ・ネットワークショップの品揃えが初期化している',
      desc: '',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713897140324601979'
      ]
    },
    {
      id: 25,
      title: 'リックの武器作製イベント・無限供給編',
      desc: '廊下と整備場を行き来するだけで報酬イベントが復活、街を出てシナリオ進行するまでの間に何度でももらえる。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713927539562062109'
      ]
    },
    {
      id: 28,
      title: 'サリバシュのガードマン',
      desc: 'サリバシュのガードマン、何度も話しかけることができるがあげると言ってるアイテム（Niche）を一向にくれない。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1714268132288954789'
      ]
    }
  ],
  text: [

    {
      title: 'アロルデシュ陸軍中佐ヴェン・マッカージェ',
      desc: 'へりへの攻撃を優先しろ！やつらをのがしてはんらん！\nあっ！こんな連中にやられるとは！',
      img: ['https://twitter.com/NEKOSANN_08/status/1711678037899796563']
    },
    {
      title: '律兵 -> 傭兵',
      desc: 'トマス「バーグショミティの律兵さ」',
      img: ['https://twitter.com/NEKOSANN_08/status/1712108218145796514']
    },
    {
      title: 'サリバシュのガードマン＝トマス？',
      desc: 'ガードマン「しゃあねぇな、ディアラバに行くぞ。」',
      img: ['https://twitter.com/NEKOSANN_08/status/1712115638981030104']
    },
    {
      desc: '信用しようじゃないか',
      desc: 'トマス「に入った！信用しようじゃないか。」',
      img: ['https://twitter.com/NEKOSANN_08/status/1712117237564547179']
    },
    {
      title: '万事休すだな・・・',
      desc: 'ガードマン「しゃあねぇな、ディアラバに行くぞ。万事休すだな・・・。」\n万事休すは多分正しい。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712118706791460925']
    },
    {
      title: '制海艦モントの廊下',
      desc: '「アジト」',
      img: ['https://twitter.com/NEKOSANN_08/status/1712423445647208844']
    },
    {
      title: '水兵のマルコ',
      desc: 'マルコ「どうしたんだい？」\nアッシュ「ちょっと散歩に・・・」\n「そうか。長い散歩は終わったかい？」',
      img: ['https://twitter.com/NEKOSANN_08/status/1712424822087848158']
    },
    {
      title: 'トマス＝エイミア？',
      desc: 'Stage11の戦闘完了時におそらくトマスのセリフであろうものがエイミアのものとして表現される。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712874794734207336']
    },
    {
      title: 'Stage19で色々',
      desc: 'リーザ(トマス？)「ほんとだ。誰もいねぇ・・・。」\nサユリ「悲しいわね・・・」 -> 悲しくなさそうな表情\nリーザ（アッシュ）「ああ・・・俺の・・・生まれた故郷だ・・・。」\nアッシュ（ヴェン）「この場を離れるのは残念だが、私はフェンリルを持って司令部に戻る。後は任せたぞ」',
      img: ['https://twitter.com/NEKOSANN_08/status/1713457793745973472']
    },
    {
      title: 'Stage63の締め',
      desc: 'トマス（ロッキー）「ありがとう・・・２人とも。」ロズウェル（トマス）「がはははは！！！」',
      img: ['https://twitter.com/NEKOSANN_08/status/1713909575135707286']
    },
    {
      title: '整備兵（リックの父親ダン）',
      desc: 'アッシュ！大変よ！アロルデシュ軍の襲撃らしいわ',
      img: ['https://twitter.com/NEKOSANN_08/status/1713867458132820148']
    },
    {
      title: '３部隊を編成し、トマスから司令官に任命されたアッシュ',
      desc: '街を出る時に「いいえ」を選択 -> はやくしやがれ！\n街を出る時に「はい」を選択 -> みんな、生きて帰ってこようぜ！',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713873913141399899',
        'https://twitter.com/NEKOSANN_08/status/1713875187782070340'
      ]
    },
    {
      title: '補給部隊キャンプの整備兵（Stage27）',
      desc: 'ディアラバに革命軍が侵入したそうで・・・、この街に被害が出ないことを祈りますよ。',
      img: ['https://twitter.com/NEKOSANN_08/status/1714263435868057854']
    },
    {
      title: '補給部隊キャンプの整備兵（Stage28）',
      desc: 'ディアラバに革命軍が侵入したそうで・・・、',
      img: ['https://twitter.com/NEKOSANN_08/status/1714297354013319250']
    },
    {
      title: 'サリバシュのガードマン',
      desc: 'ようし！出発だ！！',
      img: ['https://twitter.com/NEKOSANN_08/status/1714297938548265038']
    },
    {
      title: '整備兵（リックの父親ダン）',
      desc: 'ディアラバに革命軍・・・',
      img: ['https://twitter.com/NEKOSANN_08/status/1714299001854656590']
    },
  ],
  'battele system': [
    {
      title: '闘技場でプレーヤー側の弾切れと相手の破壊が同時に成立するとこちらの負けが優先される',
      desc: '仕様の可能性あり。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711275406119297044']
    },
    {
      title: '破壊済みの箇所を攻撃する',
      desc: '発生条件不明、装備している武器種などによりばらつきがある模様。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712419809928028376']
    },
    {
      title: '虚空を殴る',
      desc: '敵味方共に格闘武器使用時に多い。パーツ破壊状態に依存しない、攻撃モーションに依存しているとの噂あり。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711751271882072247']
    },
    {
      title: '被弾演出がでない、演出タイミングがまとまる',
      desc: '同ステージではボスであるヴェン中佐の乗るヘリは撃破しても墜落演出が入らない事もありステージ固有のものか？',
      img: ['https://twitter.com/NEKOSANN_08/status/1711675955746632059']
    },
    {
      title: '未装備のスキル発動疑惑',
      desc: 'スキル・イモータルと思われる状況が、未装備・未取得にも関わらず発生。\n発生するのは味方キャラ全体に及ぶ模様。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713446510095213031',
        'https://twitter.com/NEKOSANN_08/status/1713471130022093080'
      ]
    },
    // {
    //   title: '原因不明の超攻撃力',
    //   desc: 'スキル発動などの表現なし、条件不明。',
    //   img: ['https://twitter.com/NEKOSANN_08/status/1714247998723719222']
    // },
    {
      title: '複数回同じスキルを習得する',
      desc: 'トマス以外では確認できず。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713917856596042054',
        'https://twitter.com/NEKOSANN_08/status/1714266231082221721'
      ]
    },
    {
      title: '敵の航空戦力（戦闘機）で設置地雷が起動する',
      desc: '起動しても航空機なので（body体力しかないし）当然ノーダメージ。\n余談として自分で設置した地雷にホバー機体で起動することはできた。（脚部は破損）\n一応、オリジナル版準拠の攻略サイトでホバー脚で地雷を無力化できるとの記載あり。',
      img: ['https://twitter.com/NEKOSANN_08/status/1714289700960440673']
    },
    {
      title: '敵の遠距離武器の適用範囲',
      desc: 'Stage28以降に出現するインターゲーン製無人機体でのみ確認。',
      img: ['https://twitter.com/NEKOSANN_08/status/1714317883877314997']
    },
    {
      title: '敵の隣接（格闘）武器で遠距離攻撃を受ける',
      desc: 'Stage28以降に出現するインターゲーン製無人機体でのみ確認。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1714284264215445593',
        'https://twitter.com/NEKOSANN_08/status/1714314451388874765',
        'https://twitter.com/NEKOSANN_08/status/1714315769528660003'
      ]
    },
    {
      title: 'ビスミラーの行動不全',
      desc: 'プレーヤー機と２マス以上開けた状態で攻撃行動を取るとなにもせず行動終了となる。（スキル表示などはされる）',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1714256513093841300',
        'https://twitter.com/NEKOSANN_08/status/1714605872553644170'
      ]
    },
    {
      title: 'リペアアイテムの１アイテム複数回使用',
      desc: 'バックパックとリペアやリバースを装備して使用する時、回復演出中に項目キャンセルすると複数箇所に使用できてしまう。\nまた、隣接する味方がいる時には味方にも同時使用が可能。消費数は当然１。',
      img: ['https://twitter.com/NEKOSANN_08/status/1714612137824563606']
    },
    {
      title: '着弾エフェクトの過剰化',
      desc: 'v1.0.3で初確認。マシンガンなどの着弾演出が派手になっていく。\n最初は適量だが同ステージの戦闘中に演出回数が増える毎に大きく派手になっていく。\n目立ちにくいが火炎放射などのエフェクトも肥大化してる模様。',
      img: ['https://twitter.com/NEKOSANN_08/status/1715404926179013054']
    }
  ],
  system: [
    {
      title: 'アウトセーブ',
      desc: 'セーブデータがない時の（おそらくは）オートセーブ項目の誤字。',
      img: ['https://twitter.com/NEKOSANN_08/status/1715396639052206353']
    },
    {
      title: 'メモリーカード読み込み中...',
      desc: 'セーブを選択時に一瞬だけ表示される。',
      img: 'https://twitter.com/NEKOSANN_08/status/1710925548166459671'
    },
    {
      title: 'オリジナル版BGMに変更時のムービーシーンの不具合、fps低下など',
      desc: 'Ver 1.0.3で修正確認。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1710995095233949883',
        'https://twitter.com/NEKOSANN_08/status/1714247207904530684'
      ],
      fixed: 103
    },
    {
      title: '所持アイテムの項目が分裂・別計算',
      desc: '別ミッションから持ち込みがあると分裂しやすい。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711284926409314386']
    },
    {
      title: 'キャラ名がコールサイン名で表記される',
      desc: '酒場などの選択項目でプレイアブルのキャラだけ英語のコールサイン表記。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711735541128159394']
    },
    {
      title: 'パイロットのステータス閲覧開始時に操作スタックする',
      desc: '条件不明、操作メンバーの変更があった直後に発生しやすいとされている。',
      img: ['https://twitter.com/NEKOSANN_08/status/1711711387024765193']
    },
    {
      title: 'マニュアルセットアップ退出時のBGM消失不具合',
      desc: 'Stage10での制海艦モントでセットアップすると発生しやすい、\n他のステージでもセットアップ離脱後BGMが遅れて流れ出すなどの不具合あり。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712431228568392118']
    },
    {
      title: 'ショップ売却額の計算不具合',
      desc: '再現性不明。',
      img: ['https://twitter.com/NEKOSANN_08/status/1712458529678979546']
    },
    {
      title: 'Lv5コンピュータの無限複製',
      desc: 'メーカークロックアップのコンピュータ指定時に実行数がリセットされていないがための不具合。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1713072850826084702',
        'https://twitter.com/NEKOSANN_08/status/1713080880837845268',
        'https://twitter.com/NEKOSANN_08/status/1713091113731731798',
        'https://twitter.com/NEKOSANN_08/status/1713095227291082966',
        'https://twitter.com/NEKOSANN_08/status/1713077641987924030'
      ]
    },
    {
      title: '格闘武器の攻撃力合算表示の不具合',
      desc: '右手と左手で同じ腕と武器を装備していても異なる攻撃力数値を示す不具合。',
      img: ['https://twitter.com/NEKOSANN_08/status/1713878776147488985']
    },
    {
      title: '入手経路不明の機体、イーゲルアインスH',
      desc: 'パーツリストにいつの間にか追加されている、オリジナル版のデータに該当する機体がない謎の機体。',
      img: ['https://twitter.com/NEKOSANN_08/status/1713931611442721140']
    },
    {
      title: '装備武器の一部が認識不能、操作などがスタックする不具合',
      desc: 'フルセット購入が要因にあると思われるが詳細条件不明。',
      img: [
        'https://twitter.com/NEKOSANN_08/status/1714334201103913436',
        'https://twitter.com/NEKOSANN_08/status/1714353250370277748',
        'https://twitter.com/NEKOSANN_08/status/1714355669275644408',
        'https://twitter.com/NEKOSANN_08/status/1714357526786162758',
        'https://twitter.com/NEKOSANN_08/status/1714350770542559383'
      ]
    }
  ]
}


const util = {
  rm_wrap(f) {
    const s = f.toString()
    return s.substring(s.indexOf('{') + 1, s.lastIndexOf('}'))
  },
  extScript(s) {
    let ex = ''
    for (const k in s) {
      ex += this.rm_wrap(s[k])
    }
    return ex
  },
  PageScripts(_) { return `${this.extScript(prompt)} \n window.addEventListener('DOMContentLoaded', _=> {${this.extScript(loaded)}})` }
}
const prompt = {
  smoothscroll: () => {
    window.onhashchange = () => {
      if (!!window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }
}
const loaded = {
  jumper: () => {
    document.querySelectorAll("h2.kinds").forEach(e => {
      document.querySelector("ul.jumping").insertAdjacentHTML('beforeend', '<li><a class="en" href="#' + e.getAttribute('id') + '">' + e.textContent + '</a></li>')
    })
  },
}


module.exports = {
  loadedScript: (typearg) => {
    return typearg.Array[0].replace('((__loadedScript__))', '(()=>{' + typearg.Object.minifyJs.minify(util.PageScripts()).code + '})()')
  },
  report: (typearg) => {
    let html = ''
    const parts = {
      title: typearg.Array[0],
      head: typearg.Array[1],
      rep: typearg.Array[2],
      bottom: typearg.Array[3]
    }

    Object.entries(report).forEach((x, y) => {
      html += parts.title.repFWword({ anker_id: y, category: x[0] })
      html += parts.head
      x[1].forEach(c => {
        let index = 0
        const stage_id = c.id ? '【Stage ' + c.id + '】' : ''
        const twlink =
          c.img ?
            '<div>' + c.img.toString().replace(/[^,]+/g, url => {
              index++
              return '<a href="' + url + '" target="_blank">link_' + index + '</a>'
            }) + '</div>' :
            ''
        html += parts.rep.repFWword({
          title: stage_id + c.title,
          desc: c.desc?.replace(/\n/g, '<br>') + twlink.replace(/,/g,' / ')
        })
      })
      html += parts.bottom
    })

    return html
  }

}
