var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}
window.addEventListener('load', function() {
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__anterior',
            next: '.carousel__siguiente'
        },
        responsive: [{
            // screens greater than >= 775px
            breakpoint: 450,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            // screens greater than >= 1024px
            breakpoint: 800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }]
    });
});

$(document).ready(function() {
    $('#closesession').hide();
    $('#welcome').hide();
    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
    $('.text').on('click', function() {
        $('.menus').toggle();
    });
});

$(document).on('click', '.js-login', function() {
    $('#myModal').modal();
});

$(document).on('click', '.js-btnlogin', function() {
    debugger
    var nom = document.getElementsByName("uname")[0].value;
    var pass = document.getElementsByName("psw")[0].value;

    if ((nom != undefined || nom != "") && (pass != undefined || pass != "")) {
        /*Guardando los datos en el LocalStorage*/
        localStorage.setItem(nom, pass);

        $('.js-login').hide();
        $('#myModal').modal('toggle');
        $('#user')[0].innerText = nom;
        $('#closesession').show();
        $('#welcome').show();

    } else {
        $.alert("User or Password Invalid")
    }

});

$(document).on('click', '#closesession', function() {
    var user = $('#user')[0].innerText;
    localStorage.removeItem(user);

    $('.js-login').show();
    $('#user')[0].innerText = "";
    $('#closesession').hide();
    $('#welcome').hide();
});
function grabPoke() {
  let query = $("#text").val().toLowerCase(); 
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
      if(response.ok) {
        
          return response.json()
      } else {
        
        alert('¡Por favor verifica que el nombre del pokemon o el número nacional sean correctos!.')
      }
  })
    .then((out) => {
     console.log(out)
    
  let number = out.id;  
  let name = out.species.name.toUpperCase();
  let pic = out.sprites.front_default;
  let type = out.types.map((type) => type.type.name).join(', ').toUpperCase();
  let abilities = out.abilities.map((ability) => ability.ability.name).join(', ').toUpperCase();
  let hp = out.stats[5].base_stat;
  let attack = out.stats[4].base_stat;
  let defense = out.stats[3].base_stat;
  let speed = out.stats[0].base_stat; 
    document.getElementById("number").innerHTML = "# " + number;
    document.getElementById("poke_pic").src = pic;
    document.getElementById("name").innerHTML = name;
    document.getElementById("type").innerHTML = "Tipo: " + type;
    document.getElementById("abilities").innerHTML = "Habilidades: " + abilities;
    document.getElementById("hp").innerHTML = "Salud base: " + hp;
    document.getElementById("attack").innerHTML = "Ataque: " + attack;
    document.getElementById("defense").innerHTML = "Defensa: " + defense;
    document.getElementById("speed").innerHTML = "Velocidad: " + speed;
  })   
  }
  $("#text").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});
      document.getElementById('submit').addEventListener("click", function()
  {
      
      grabPoke();
    })
}	
