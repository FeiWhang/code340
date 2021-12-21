<template>
  <div class="HomePartner">
    <h2>Our imaginary partners</h2>
    <div class="HomePartner__grid">
      <div class="HomePartner__subgrid">
        <img src="@/assets/partner1.png" alt="" draggable="false" />
      </div>
      <div class="HomePartner__subgrid">
        <img src="@/assets/partner2.png" alt="" draggable="false" />
        <img src="@/assets/partner3.png" alt="" draggable="false" />
      </div>
      <div class="HomePartner__subgrid">
        <img src="@/assets/partner7.png" alt="" draggable="false" />
        <img src="@/assets/partner5.png" alt="" draggable="false" />
        <img src="@/assets/partner6.png" alt="" draggable="false" />
      </div>
      <div class="HomePartner__subgrid">
        <img src="@/assets/partner9.png" alt="" draggable="false" />
        <img src="@/assets/partner8.png" alt="" draggable="false" />
      </div>
      <div class="HomePartner__subgrid">
        <img src="@/assets/partner4.png" alt="" draggable="false" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HomePartner {
  width: var(--layoutWidth);
  display: flex;
  flex-direction: column;
  margin: 4rem auto;
  &__grid {
    margin-top: 4rem;
    display: flex;
    align-items: center;
    align-self: center;
    justify-items: center;
    column-gap: 32px;
  }
  img {
    width: 150px;
    margin: 18px 0;
  }
  &__subgrid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
