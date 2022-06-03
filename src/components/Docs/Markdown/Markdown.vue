<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import {
  defineComponent,
  ref,
  unref,
  nextTick,
  computed,
  watch,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useLocale } from '@/locales/useLocales'

type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined;

export default defineComponent({
  inheritAttrs: false,
  props: {
    height: { type: Number, default: 360 },
    value: { type: String, default: '' },
  },
  emits: ['change', 'get', 'update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<HTMLElement | null>(null);
    const vditorRef = ref(null) as Ref<Vditor | null>;
    const initedRef = ref(false);

    const { getLocale } = useLocale();

    const valueRef = ref('');

    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value) {
          instance.getVditor()?.setValue(v);
        }
        valueRef.value = v;
      },
    );

    const getCurrentLang = computed((): 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' => {
      let lang: Lang = 'zh_CN';
      switch (unref(getLocale)) {
        case 'en':
          lang = 'en_US';
          break;
        case 'ja':
          lang = 'ja_JP';
          break;
        case 'ko':
          lang = 'ko_KR';
          break;
        default:
          lang = 'zh_CN';
      }
      return lang;
    });
    function init() {
      const wrapEl = unref(wrapRef) as HTMLElement;
      if (!wrapEl) return;
      const bindValue = { ...attrs, ...props };
      const insEditor = new Vditor(wrapEl, {
        theme: 'classic',
        lang: unref(getCurrentLang),
        mode: 'wysiwyg',
        fullscreen: {
          index: 520,
        },
        preview: {
          actions: [],
        },
        resize: {
          enable: true
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview",
              "devtools",
              "help",
            ],
          },
        ],
        input: (v) => {
          valueRef.value = v;
          emit('update:value', v);
          emit('change', v);
        },
        after: () => {
          nextTick(() => {
            insEditor.setValue(valueRef.value);
            vditorRef.value = insEditor;
            initedRef.value = true;
            emit('get', instance);
          });
        },
        ...bindValue,
        cache: {
          enable: false,
        },
      });
    }

    const instance = {
      getVditor: (): Vditor => vditorRef.value!,
    };

    function destroy() {
      const vditorInstance = unref(vditorRef);
      if (!vditorInstance) return;
      try {
        vditorInstance?.destroy?.();
      } catch (error) { }
      vditorRef.value = null;
      initedRef.value = false;
    }

    onMounted(() => {
      init()
    });

    onBeforeUnmount(destroy);
    onDeactivated(destroy);
    return {
      wrapRef,
      ...instance,
    };
  },
});
</script>
