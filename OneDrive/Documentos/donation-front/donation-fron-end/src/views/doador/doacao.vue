<template>
<div class="background">
      <div class="faixa">
        <p> O QUE DOAR? </p>
  </div>
  <div class="container-itens">
    <div class="lados">
      <div class="box-itens">
      <img src="/src/assets/coberta.png">
      <p>Cobertores</p>
    </div>
  </div>
  <div class="lados">
      <div class="box-itens">
      <img src="/src/assets/roupa.png">
      <p>Roupas</p>
    </div>
  </div>
  
  </div>
  <div class="container-itens">
    <div class="lados">
      <div class="box-itens">
      <img src="/src/assets/higiene.png">
      <p>Itens de higiêne</p>
    </div>
  </div>
  <div class="lados">
      <div class="box-itens">
      <img src="/src/assets/alimentos.png">
      <p>Alimentos não pereciveis</p>
    </div>
  </div>
  </div>

<div class="form-doacao">
        <div class="box-form">
        
          <img  class="lados-doacao" src="/src/assets/roupa.png"  alt="logo"/>
          
        <div class="lados-doacao back-whitegreen">
            <div class="doacao-container">
                
                <form action="#">
                  <p class="subtitulo">
                      Cadastre sua Doação
                  </p>
                  <div class="input-group-ong">
                        <input type="text" id="tipo" name="tipo" placeholder="Selecione o tipo de doação" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="password" id="qtd" name="qtd" placeholder="qtd" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="text" id="nome" name="nome" placeholder="nome do item" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="password" id="CPF" name="CPF" placeholder="CPF" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="text" id="username" name="username" placeholder="Bairro" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="password" id="password" name="password" placeholder="Rua" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="password" id="password" name="password" placeholder="CEP" required>
                      </div>
                      <div class="input-group-ong">
                        <input type="radio" id="password" name="password" value="sim" >
                        <label for="Deseja que a doação seja coletada">Deseja que a doação seja coletada</label>
                      </div>
                  <button  type="submit">Login</button>
                </form>
            
              </div>
        </div>
       
    </div>
    </div>
  </div>
</template>
