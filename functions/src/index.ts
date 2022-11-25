import * as functions from "firebase-functions";
import {BlastEngine, Transaction} from "blastengine";
const config = functions.config().blastengine;
new BlastEngine(config.user_id, config.api_key);
export const contact = functions.https.onCall(async (data) => {
  const body = `${data.name}様
お問い合わせいただきありがとうございます。

内容を確認の上、早急にご返信いたします。

お名前： ${data.name}
メールアドレス： ${data.email}
電話番号： ${data.tel}
お問い合わせ内容：
${data.body}
`;
  const transaction = new Transaction();
  transaction
      .setFrom(config.from_address, config.from_name)
      .setSubject("お問い合わせいただきありがとうございます")
      .setTo(data.email)
      .setText(body);
  await transaction.send();
  // functions.logger.info(data, {structuredData: true});
  return "success";
});
