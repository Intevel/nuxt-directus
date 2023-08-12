<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false
  },
  video: {
    type: Array as PropType<string[]>,
    required: false
  }
})
</script>

<template>
  <section class="block-hero">
    <div class="layout">
      <div class="content">
        <p v-if="$slots.announce" class="announce">
          <ContentSlot :use="$slots.announce" unwrap="p" />
        </p>

        <h1 v-if="$slots.title" class="title">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>

        <p v-if="$slots.description" class="description">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </p>

        <div class="actions">
          <template v-if="!$slots.actions">
            <ButtonLink v-if="cta" class="cta" bold size="medium" :href="(cta[1] as any)">
              {{ cta[0] }}
            </ButtonLink>

            <a v-if="secondary" :href="(secondary[1] as any)" class="secondary">
              {{ secondary[0] }}
            </a>
          </template>
          <ContentSlot v-else :use="$slots.actions" unwrap="p" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="ts">
css({
  '.block-hero': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '{space.20} 0',
    '@sm': {
      padding: '{space.24} 0',
    },
    '@lg': {
      paddingTop: '{space.32}',
      paddingBottom: '{space.14}',
    },
    '.layout': {
      display: 'grid',
      gap: '{space.8}',
    },
    '.content': {
      '@lg': {
        gridColumn: 'span 2 / span 2'
      },
      '.announce': {
        marginBottom: '{space.2}',
        textAlign: 'center',
        '@lg': {
          textAlign: 'center'
        }
      },
      '.title': {
        color: '{elements.text.primary.color.static}',
        fontWeight: '{fontWeight.bold}',
        letterSpacing: '{letterSpacing.tight}',
        textAlign: 'center',
        fontSize: '{text.4xl.fontSize}',
        lineHeight: '{text.4xl.lineHeight}',
        '@sm': {
          fontSize: '{text.5xl.fontSize}',
          lineHeight: '{text.5xl.lineHeight}',
        },
        '@lg': {
          fontSize: '{text.6xl.fontSize}',
          lineHeight: '{text.6xl.lineHeight}',
          textAlign: 'center'
        }
      },
      '.description': {
        marginTop: '{space.4}',
        fontSize: '{text.lg.fontSize}',
        lineHeight: '{text.lg.lineHeight}',
        textAlign: 'center',
        color: '{elements.text.secondary.color.static}',
        '@lg': {
          textAlign: 'center'
        }
      },
      '.extra': {
        marginTop: '{space.6}'
      },
      '.actions': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '{space.4}',
        marginTop: '{space.6}',
        '@sm': {
          marginTop: '{space.10}',
          flexDirection: 'row',
          gap: '{space.6}'
        },
        '@lg': {
          justifyContent: 'flex-center'
        },
        '.cta': {
          marginBottom: 0
        },
        '.secondary': {
          fontWeight: '{fontWeight.medium}',
          color: '{elements.text.secondary.color.static}',
          '&:hover': {
            color: '{elements.text.secondary.color.hover}'
          }
        }
      }
    }
  }
})
</style>
