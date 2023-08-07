'use strict';

//slider----------------------------------------------
//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
if (windowwidth > 768) {
	var responsiveImage = [ //PC用の画像
		{
			src: './img/bigbg01.jpg'
		},
		{
			src: './img/bigbg02.jpg'
		},
		// {
		// 	src: './img/bigbg03.jpg'
		// }
	];
} else {
	var responsiveImage = [ //タブレットサイズ（768px）以下用の画像
		{
			src: './img/bigbg01.jpg'
		},
		{
			src: './img/sp-bigbg02.jpg'
		},
		// {
		// 	src: './img/bigbg03.jpg'
		// }
	];
}

//Vegas全体の設定

$('#slider').vegas({
	transition: 'blur', //切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
	transitionDuration: 2000, //切り替わりのアニメーション時間をミリ秒単位で設定
	delay: 10000, //スライド間の遅延をミリ秒単位で。
	animationDuration: 20000, //スライドアニメーション時間をミリ秒単位で設定
	animation: 'kenburnsUp', //スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
	slides: responsiveImage, //画像設定を読む
	//timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
});


//---------------------------------------------------



//gnav----------------------------------------------

$(".openbtn").click(function () { //ボタンがクリックされたら
	$(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
	$("#g-nav").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () { //ナビゲーションのリンクがクリックされたら
	$(".openbtn").removeClass('active'); //ボタンの activeクラスを除去し
	$("#g-nav").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
});






// モーダル表示
class Modal {
    constructor(targetELm) {
        //初期値(DOM)
        this.DOM = {};
        this.DOM.targetELm = targetELm;
        this.DOM.modalOverlay = "";
        this.DOM.modalElm = "";
        this.DOM.closeBtn = "";

        // 最初に実行する関数
        this._init();
    }

    _init() {
        // ターゲットリンクをクリックしたら
        this.DOM.targetELm.addEventListener('click', this._clickEvent.bind(this));
    }
    // クリックイベント
    _clickEvent(event) {
        // クリックイベントをキャンセル
        event.stopPropagation();
        event.preventDefault();

    // href要素を取得
    const targetHash = this.DOM.targetELm.href;
     
    // テキストの場合
      if(targetHash.indexOf('#') > 0) {
            const targetSelector = targetHash.replace(/.*(#.*)/, '$1');
            // モーダルする要素を取得
            const targetHTML = document.querySelector(targetSelector).innerHTML;
            const elmDIV = document.createElement('div');
                  elmDIV.innerHTML = targetHTML;
            this.DOM.modalElm = elmDIV;
        }
        // 画像の場合
        console.log(targetHash.indexOf('jpg') > 0);
        if(targetHash.indexOf('jpg') > 0 || targetHash.indexOf('jpeg') > 0 || targetHash.indexOf('png') > 0 || targetHash.indexOf('gif') > 0){
            const imgElm = document.createElement('img');
                  imgElm.src = targetHash;
                  imgElm.id = "targetElm";

            this.DOM.modalElm = imgElm;
        }

        this._appearOverlay(); // オーバーレイ表示
        this._modalShow(); // モーダル表示 
    }

    // オーバーレイ表示
    _appearOverlay() {
        // オーバーレイ作成
        this.DOM.modalOverlay = document.createElement('div');
        this.DOM.modalOverlay.classList.add('modal-overlay', 'visible');

        // 要素追加
        document.body.appendChild(this.DOM.modalOverlay);

        document.body.style.overflow = "hidden";
        document.body.style.position = "relative";

        // モーダル非表示イベント
        this.DOM.modalOverlay.addEventListener('click', this._disappearModal.bind(this));
    }
    // モーダル表示
    _modalShow() {
        const targetmodalItem = document.createElement('div');
              targetmodalItem.appendChild(this.DOM.modalElm);
        
        document.body.appendChild(targetmodalItem);
        targetmodalItem.classList.add('modal', 'visible');
        targetmodalItem.classList.add('fadein');
        // フェードインのクラス
        // setTimeout(function() {
        //     targetmodalItem.classList.add('fadeout');
        //     targetmodalItem.classList.remove('fadein');
        //     targetmodalItem.classList.remove('fadeout');
        // }, 300);
        //クローズボタン作成
        this._closeBtn(targetmodalItem);

    }
    // クローズボタン作成
    _closeBtn(addElement) {
        this.DOM.closeBtn = document.createElement('span');
        this.DOM.closeBtn.classList.add('modal-closebtn', 'fas', 'fa-times-circle');
        addElement.appendChild(this.DOM.closeBtn);

        // モーダル非表示イベント
        this.DOM.closeBtn.addEventListener('click', this._disappearModal.bind(this));
    }
    // モーダル非表示
    _disappearModal() {
        // this.DOM.modalElm.classList.remove('modal', 'visible');
        document.querySelector(".modal-overlay").remove();
        document.querySelector(".modal-closebtn").remove();
        document.querySelector(".modal").remove();
        document.body.style.overflow = "visible";
    }
}

// インスタンス化
const targetBtns = document.querySelectorAll(".modalBtn");
targetBtns.forEach((targetBtn) => {
    const modal = new Modal(targetBtn);
});


