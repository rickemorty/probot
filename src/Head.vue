<script setup>
import { inject } from 'vue'
var { app, chat, update } = inject('lilo')

</script>

<template lang="pug">
.Head.row.ac(:class="app.talk && 'talk'")
	.avatar(:style="`background-image:url(${app.avatar})`")
	.col.nome.fb
		.cw {{app.nome}}
		.status.cg {{app.talk?'Escrevendo...':'Online'}}
	//i.fullicon.pt.fa-solid.fa-up-right-and-down-left-from-center(title="TELA CHEIA")
	b.cw(v-if="app.a") ADMIN
	.sacola.pt.tc.fb(v-else @click="sacola" title="SACOLA") {{app.pedido.produtos.length}}
</template>

<style lang="sass" scoped>
.Head
	padding: 7px 10px
	padding-right: 16px
	box-shadow: 0 0 10px #999, inset 1px 0 50px rgba(black,.3)
	background: var(--main)
	filter: contrast(120%)
	height: 56px
	&.talk
		background: linear-gradient(-45deg, #8D00FC, #ee7752, #23a6d5, #23d5ab)
		background-size: 400% 400%
		animation: talk 2.8s ease infinite
	.avatar
		border-radius: 100%
		background: #f1f1f1
		overflow: hidden
		border: 1px solid #00FF7F
		width: 52px
		height: 52px
		background-size: cover
		background-position: center
		box-shadow: 0 1px 2px #666 
		&::after
			border-radius: 100%
			background: #00FF7F
			box-shadow: inset 2px #888
			width: 12px
			height: 12px
			position: absolute
			content: ' '
			margin-top: 40px
			margin-left: 41px
			box-shadow: 0 1px 1px #666 
	.nome
		flex: 1
		padding: 0 8px
		margin-top: 4px
		font-size: 19px
		text-shadow: 0 1px 1px #666 
	.status
		font-size: 15px
	button
		padding: 6px 8px
		font-weight: bold
		border: none
		border-radius: 14px
		margin-top: 8px
		margin-right: 10px
		color: #444    
	.sacola:hover
		font-size: 22px
		opacity: 1
	@keyframes talk
		0%
			background-position: 0% 50%
		50%
			background-position: 100% 50%
		100%
			background-position: 0% 50%
</style>
