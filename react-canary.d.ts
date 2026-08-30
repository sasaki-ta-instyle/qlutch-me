/**
 * React canary features (ViewTransition 等) の型を有効化する。
 * https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
 * Next 16 App Router は React canary に載っており、`import { ViewTransition } from 'react'`
 * が実行時には解決されるが、@types/react の canary 型はデフォルト無効なのでここで opt-in する。
 */
import {} from "react/canary";
