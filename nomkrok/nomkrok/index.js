var product= [{
    id: 1,
    img: 'imgs/K1_spo.png',
    name:'SPRING ONION',
    price: 20,
    description: 'Kanom Krok topped with Spring onion. Fragrant, sweet, nutty, delicious, authentic taste.',
    type: 'Creamy'

}, {
    id: 2,
    img: 'imgs/K2_Pum.png',
    name:'PUMKIN',
    price: 20,
    description: 'Kanom Krok topped with Pumpkin. Fragrant, sweet, nutty, delicious, pumpkin lovers.',
    type: 'Creamy'
}, {
    id: 3,
    img: 'imgs/K3_SP.png',
    name:'SWEET POTATO',
    price: 20,
    description: 'Kanom Krok topped with sweet potato. Fragrant and delicious, especially for those who like sweet potatoes. Recommended flavors.',
    type: 'Creamy'
}, {
    id: 4,
    img: 'imgs/K4_Taro.png',
    name:'TARO',
    price: 20,
    description: 'Kanom Krok topped with taro, sweet and creamy for those who dont like too much sweetness. Eat it with the shops soy milk. Its definitely delicious.',
    type: 'Creamy'
}, {
    id: 5,
    img: 'imgs/K5_Corn.png',
    name:'CORN',
    price: 20,
    description: 'For those with a sweet tooth, it must be Khanom Krok topped with corn. Its sweet and hygienic. ',
    type: 'Sweeties'
}, {
    id: 6,
    img: 'imgs/K6_Foi.png',
    name:'FOI THONG',
    price: 20,
    description: 'Kanom Khrok topped with foi thong , combo sweet, the sweetest, anyone who likes sweetness, recommend this menu.',
    type: 'Sweeties'
}, {
    id: 7,
    img: 'imgs/K7_Coco.png',
    name:'COCONUT',
    price: 20,
    description: 'Kanom Krok topped with coconut, fragrant coconut aroma, sweet and soft, doesnt hurt your throat.',
    type: 'Sweeties'
}, {
    id: 8,
    img: 'imgs/K8_SoiM.png',
    name:'SOY MILK',
    price: 8,
    description: 'Real organic soy milk, made fresh every morning, hot and ready to welcome a new day brightly. Vegetarians can eat it.',
    type: 'Drink'
}, {
    id: 9,
    img: 'imgs/K9_Milk.png',
    name:'MILK',
    price: 13,
    description: 'Detail Of Product9',
    type: 'Drink'
}, {
    id: 10,
    img: 'imgs/K10_Cm.png',
    name:'CORN MILK',
    price: 15,
    description: 'Detail Of Product10',
    type: 'Drink'
},{
    id: 11,
    img: 'imgs/K11_Ptk.png',
    name:'PATONGKO',
    price: 2,
    description: 'Detail Of Product11',
    type: 'Patongko'

},{
    id: 12,
    img: 'imgs/K12_Pao.png',
    name:'PAO',
    price: 3,
    description: 'Detail Of Product12',
    type: 'Patongko'

}]

$(document).ready(()=>{

    $.ajax({
        method: 'get',
        url: './api/getallproduct.php', 
        success: function(response) {
            console.log(response)
            if(response.RespCode == 200) {

                product = response.Result;

                var html = '';
                for (let i = 0; i < product.length; i++) {
                    html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                                <img class="product-img" src="./imgs/${product[i].img}" alt="">
                                <p style="font-size: 1.2vw;">${product[i].name}</p>
                                <p stlye="font-size: 1vw;">${product[i].price } THB</p>
                            </div>`;
                }
                $("#productlist").html(html);
            }
        },
        error: function(err){
            console.log(err)
        }

    })

})

function sname(elm){
    //console.log('#'+elm.id)
    var value = $('#'+elm.id).val(); 
    console.log(value)


    var html= '';
    for (let i = 0; i < product.length; i++) {
        if(product[i].name.includes(value.toUpperCase())){
         html+= `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
         <img class="product-img" src="./imgs/${product[i].img}" alt="">
         <p style="font-size: 1.2vw;">${product[i].name}</p>
         <p stlye="font-size: 1vw;">${product[i].price}</p>
       </div>`;
        }
    }
    if(html==''){
        $("#productlist").html(`<p>Not found.</p>`);
    }
    else{
        $("#productlist").html(html);
    }
}

function searchproduct(p){
    console.log(p)
    $(".product-items").css('display', 'none')
    if(p=='all'){
        $(".product-items").css('display', 'block')
    }else {
        $("."+p).css('display', 'block')
    }
}

var prdindex = 0;
function openProductDetail(index){
    prdindex = index;
    console.log(prdindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src',product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(product[index].price+ ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal(){
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart(){
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if(prdindex == cart[i].index){
            //console.log('Same'+i)
            cart[i].count++;
            pass = false;
        }
        /*else{
            console.log('Not'+i)
        }*/
        
    }

    if(pass){
        var obj = {
            index: prdindex,
            id: product[prdindex].id,
            name: product[prdindex].name,
            price: product[prdindex].price,
            img: product[prdindex].img,
            desc: product[prdindex].description,
            count: 1

        };
        //console.log(obj)
        cart.push(obj)
    }
    console.log(cart)
    Swal.fire(
        {
            icon: 'success',
            title: 'Add ' + '"'+product[prdindex].name +'"'+ ' to cart.'
        }
    )
    $("#cartcount").css('display','flex').text(cart.length)

}

function openCart(){
    $("#modalCart").css('display','flex')
    rendercart();
}

function rendercart(){
    if(cart.length > 0){
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html+= `<div class="cartlist-items">
            <div class="cartlist-left">
              <img src="${cart[i].img}" alt="">
              <div class="cartlist-detail">
                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                <p style="font-size: 1.2vw;">${cart[i].price * cart[i].count } THB</p>
                <p style="font-size: 1vw;">( ${cart[i].desc} )</p>
              </div>
            </div>
            <div class="cartlist-right">
              <p onclick="deinitem('-', ${i})" class="btnc">-</p>
              <p id = "countitem${i}" style="margin: 0 20px;">${cart[i].count}</p>
              <p onclick="deinitem('+', ${i})" class="btnc">+</p>
            </div>
          </div>`;
            
        }
        $("#mycart").html(html)
    }else{
        $("#mycart").html(`<p> Not found product.</p>`)
    }

}

function deinitem(action, index){
    if(action == '-'){
        if(cart[index].count > 0){
            cart[index].count--;
            $("#countitem"+index).text(cart[index].count)
            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Delete Product?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                    if(res.isConfirmed){
                        cart.splice(index,1) 
                        //to DO Insert or Delete อันนี้ ลบของที่ index มาไป 1 ชิ้น
                        console.log(cart)
                        rendercart();
                        $("#cartcount").css('display','flex').text(cart.length)

                        if(cart.length <= 0){
                            $("#cartcount").css('display','none')
                        }
                    }
                    else{
                        cart[index].count++;
                        $("#countitem"+index).text(cart[index].count)
                    }

                })

            }
            rendercart();       
        }
    } else if(action == '+'){
        cart[index].count++;
        $("#countitem"+index).text(cart[index].count)
        rendercart();
    }
}