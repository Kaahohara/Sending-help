<template>
  <div class="background">
    <div class="faixa">
      <p>O QUE DOAR?</p>
    </div>
    <div class="container-itens">
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/coberta.png">
          <p>Cobertores</p>
        </div>
      </div>
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/roupa.png">
          <p>Roupas</p>
        </div>
      </div>
    </div>
    <div class="container-itens">
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/higiene.png">
          <p>Itens de higiene</p>
        </div>
      </div>
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/alimentos.png">
          <p>Alimentos não perecíveis</p>
        </div>
      </div>
    </div>

    <div class="form-doacao">
      <div class="box-form">
        <img class="lados-doacao" src="@/assets/roupa.png" alt="logo"/>
        <div class="lados-doacao back-whitegreen">
          <div class="doacao-container">
            <form action="#">
              <p class="subtitulo">
                Cadastre sua Doação
              </p>
              <div class="input-group-ong">
                <input type="text" id="tipo" name="tipo" placeholder="Tipo de doação" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="qtd" name="qtd" placeholder="Quantidade" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="nome" name="nome" placeholder="Nome do item" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="CPF" name="CPF" placeholder="CPF" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="username" name="username" placeholder="Bairro" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="password" name="password" placeholder="Rua" required>
              </div>
              <div class="input-group-ong">
                <input type="text" id="CEP" name="CEP" placeholder="CEP" required>
              </div>
              <div class="input-group-ong">
                <input type="radio" id="coletada" name="coletada" value="sim" >
                <label for="coletada">Deseja que a doação seja coletada</label>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
