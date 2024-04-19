// @refresh reload
import { Suspense, onMount } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

onMount(async () => {
  await fetch ("https://storage.ko-fi.com/cdn/scripts/overlay-widget.js?version=1.0.0");
  const script1 = document.createElement("script");
  script1.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
  script1.onload = () => {
    const script2 = document.createElement("script");
    script2.text = `
      kofiWidgetOverlay.draw('metamon', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Tip Ditto',
        'floating-chat.donateButton.background-color': '#794bc4',
        'floating-chat.donateButton.text-color': '#fff'
      });
    `;
    document.body.appendChild(script2);
  };
  document.body.appendChild(script1);
});

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Ditto's Star Rail PVP Draft Tool</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico?v=1.0.1"/>
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
