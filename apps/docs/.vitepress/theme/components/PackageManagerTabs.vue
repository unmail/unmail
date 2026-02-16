<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  package: string
}>()

const managers = [
  { id: 'pnpm', label: 'pnpm', icon: 'pnpm', cmd: 'pnpm add' },
  { id: 'bun', label: 'bun', icon: 'bun', cmd: 'bun add' },
  { id: 'npm', label: 'npm', icon: 'npm', cmd: 'npm install' },
  { id: 'yarn', label: 'yarn', icon: 'yarn', cmd: 'yarn add' },
]

const active = ref('pnpm')
const command = (mgr: typeof managers[number]) => `${mgr.cmd} ${props.package}`
</script>

<template>
  <div class="pm-tabs">
    <div class="pm-tabs-header">
      <button
        v-for="mgr in managers"
        :key="mgr.id"
        :class="['pm-tab-btn', { active: active === mgr.id }]"
        @click="active = mgr.id"
      >
        <span :class="['pm-icon', mgr.icon]" />
        <span>{{ mgr.label }}</span>
      </button>
    </div>
    <div class="pm-tabs-content">
      <div v-for="mgr in managers" :key="mgr.id" v-show="active === mgr.id" class="pm-code-block">
        <code>{{ command(mgr) }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pm-tabs {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.pm-tabs-header {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0 12px;
}

.pm-tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  border-radius: 6px 6px 0 0;
}

.pm-tab-btn:hover {
  color: var(--vp-c-text-1);
}

.pm-tab-btn.active {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border-bottom-color: var(--vp-c-brand-1);
}

.pm-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}

.pm-icon.pnpm {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="155" y="0" width="80" height="80" fill="%23F9AD00"/><rect x="77.5" y="0" width="80" height="80" fill="%23F9AD00"/><rect x="0" y="0" width="80" height="80" fill="%23F9AD00"/><rect x="155" y="77.5" width="80" height="80" fill="%23F9AD00"/><rect x="77.5" y="77.5" width="80" height="80" fill="%23F9AD00"/><rect x="155" y="155" width="80" height="80" fill="%234E4E4E"/><rect x="77.5" y="155" width="80" height="80" fill="%234E4E4E"/><rect x="155" y="232.5" width="80" height="80" fill="%234E4E4E"/></svg>');
}

.pm-icon.bun {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%23fbf0df"/><ellipse cx="28" cy="42" rx="3.5" ry="5" fill="%23362712"/><ellipse cx="44" cy="42" rx="3.5" ry="5" fill="%23362712"/><path d="M25 52c0 0 7 10 22 0" stroke="%23362712" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>');
}

.pm-icon.npm {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="%23C12127"/><rect x="48" y="48" width="160" height="160" fill="white"/><rect x="96" y="80" width="32" height="96" fill="%23C12127"/></svg>');
}

.pm-icon.yarn {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="%232C8EBB"/><path d="M203 163c-7-3-14-4-20-4-3 0-8 1-14 3-6 2-11 3-14 3-2 0-4-1-7-4l-2-2c0-1 3-5 8-11 6-7 10-14 11-19 2-8-1-19-8-33-5-10-7-18-6-24 1-7 3-12 7-15 2-2 3-3 3-5 0-3-3-6-8-8-4-2-8-2-12-1-7 3-14 10-19 22l-3 6-3-3c-8-7-17-9-23-5-4 3-5 7-4 13l1 6-4-1c-8-2-14 1-18 8-3 6-3 14 2 23l3 5-2 2c-5 4-8 9-9 16-1 8 2 16 8 24l1 2h-2c-7 1-13 4-17 8-5 5-6 11-4 17 4 10 18 17 43 19 29 3 52-1 69-12 14-9 22-20 22-32 0-8-4-14-12-18z" fill="white"/></svg>');
}

.pm-tabs-content {
  padding: 20px 24px;
  background: var(--vp-c-bg);
}

.pm-code-block {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

.pm-code-block code {
  background: var(--vp-c-bg-soft);
  padding: 12px 20px;
  border-radius: 6px;
  display: block;
  overflow-x: auto;
}
</style>
