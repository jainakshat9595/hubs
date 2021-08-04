import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { TextInputField } from "../input/TextInputField";
import { useForm } from "react-hook-form";
import { ApplyButton } from "../input/Button";
import { FormattedMessage } from "react-intl";
import { Column } from "../layout/Column";

export function AvatarUrlModal({ onSubmit, onClose }) {
  const { handleSubmit, register } = useForm();

  const iframeUrl = "https://demo.readyplayer.me";

  const receiveMessage = (event) => {
    setTimeout(() => {
      if (iframeUrl.includes(event.origin)) {
        console.log(`Avatar URL: ${event.data}`);
        onSubmit({
          url: event.data
        });
      }
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    }
  }, []);

  return (
    <Modal title="Create Custom Avatar" beforeTitle={<CloseButton onClick={onClose} />} className={'force-fullwidth'}>
      <Column as="div" padding center onSubmit={handleSubmit(onSubmit)}>
        <iframe
          src={iframeUrl}
          style={{
            width: '100%',
            height: '65vh'
          }}
        />
      </Column>
    </Modal>
  );
}

AvatarUrlModal.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};
