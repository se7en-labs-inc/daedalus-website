// import React from 'react'
// import styled from 'styled-components'
// import { GiWallet, GiVibratingShield, GiDesk, GiNewspaper, GiAbstract011 } from 'react-icons/gi'

// import WalletIcon from '../../../static/images/uploads/daedalus_wallet.svg'
// import DesktopIcon from '../../../static/images/uploads/daedalus_desktop.svg'
// import NewsIcon from '../../../static/images/uploads/daedalus_news.svg'
// import SecurityIcon from '../../../static/images/uploads/daedalus_security.svg'
// import ThemeIcon from '../../../static/images/uploads/daedalus_theme.svg'

// import Link from '../Link'

// const Container = styled.div`
//   position: relative;
//   padding-bottom: 1rem;

//   &:before,
//   &:after {
//     content: '';
//     display: block;
//     position: absolute;
//   }

//   &:after {
//     border-right: 0.1rem dashed ${({ theme }) => theme.colors.text};
//     left: 50%;
//     height: 100%;
//     top: 0;
//     transform: translateX(-50%);
//   }

//   &:before {
//     border-radius: 0.9rem;
//     width: 1.8rem;
//     height: 1.8rem;
//     border: 0.1rem solid ${({ theme }) => theme.colors.text};
//     left: 50%;
//     transform: translate(-50%, -50%);
//     top: 6rem;
//   }

//   > div {
//     display: inline-block;
//     position: relative;
//     width: 50%;
//     box-sizing: border-box;
//     padding: 0rem 12rem;
//     vertical-align: top;

//     &:first-of-type {
//       padding-left: 0;
//     }

//     &:last-of-type {
//       padding-right: 0;
//     }
//   }

//   h3 {
//     text-transform: uppercase;
//     margin-top: 5rem;
//     margin-bottom: 3.5rem;
//     position: relative;

//     &:after,
//     &:before {
//       content: '';
//       position: absolute;
//       display: block;
//     }

//     &:before {
//       border-radius: 0.4rem;
//       background-color: ${({ theme }) => theme.colors.interactive};
//       width: 0.8rem;
//       height: 0.8rem;
//       top: 50%;
//     }

//     &:after {
//       top: 50%;
//       border: 0.1rem solid ${({ theme }) => theme.colors.interactive};
//       width: 8.8rem;
//     }
//   }

//   @media screen and (max-width: 900px) {
//     &:before,
//     &:after {
//       display: none;
//     }

//     > div {
//       display: block;
//       width: 100%;
//       padding: 0;
//     }

//     h3 {
//       &:before,
//       &:after {
//         display: none;
//       }
//     }
//   }
// `

// // const LearnMore = styled.div`
// //   text-align: right;

// //   ul {
// //     list-style: none;
// //     margin-bottom: 5rem;
// //   }

// //   h3 {
// //     &:before {
// //       transform: translate(100%, -50%);
// //       right: -2.8rem;
// //     }

// //     &:after {
// //       transform: translate(100%, -50%);
// //       right: -3.2rem;
// //     }
// //   }

// //   @media screen and (max-width: 900px) {
// //     text-align: center;
// //   }
// // `

// const Features = styled.div`
//   h3 {
//     &:before {
//       transform: translate(-100%, -50%);
//       left: -2.8rem;
//     }

//     &:after {
//       transform: translate(-100%, -50%);
//       left: -3.2rem;
//     }
//   }

//   h4 {
//     display:flex;
//     align-items: center;
//     @media (max-width:899px) {
//       justify-content: center;
//     }

//     span {
//       font-size: 1.5rem;
//       & ~ span {
//         padding-left:2rem;
//       }
//     }
//   }

//   > div {
//     margin-bottom: 5rem;

//     img {
//       display: block;
//       width: 2.5em;
//       height: 2.5em;
//       margin-bottom: 0;
//       color: ${({ theme }) => theme.colors.secondaryText};
//     }

//     h4 {
//       text-transform: uppercase;
//       margin-top: 4rem;

//       &:first-of-type {
//         margin-top: 0;
//       }
//     }

//     p {
//       color: ${({ theme }) => theme.colors.secondaryText};
//     }
//   }

//   @media screen and (max-width: 900px) {
//     text-align: center;
//   }
// `

// export default () => (
//   <Query
//     render={({ frontmatter }) => (
//       <Container>
//         <Features>
//           {/* <h3>{frontmatter.content.learn_more.title}</h3> */}
//           {/* <ul>
//             {frontmatter.content.learn_more.links.map(link => (
//               <li key={link.href}><Link href={link.href} target='_blank' tracking={{ label: `features_lear_more_${link.href}` }}>{link.label}</Link></li>
//             ))}
//             </ul> */}
//           <div>
//             <h4>
//               <span>
//                 <img src={SecurityIcon} alt={frontmatter.content.wallet_features.advanced_security.title} />
//               </span>
//               <span>{frontmatter.content.wallet_features.advanced_security.title}</span>
//             </h4>
//             <p>
//               {frontmatter.content.wallet_features.advanced_security.description}
//             </p>
//             <h4>
//               <span>
//                 <img src={WalletIcon} alt={frontmatter.content.wallet_features.unlimited_accounting.title} />
//               </span>
//               <span>{frontmatter.content.wallet_features.unlimited_accounting.title}</span>
//             </h4>
//             <p>
//               {frontmatter.content.wallet_features.unlimited_accounting.description}
//             </p>
//             <h4>
//               <span>
//                 <img src={DesktopIcon} alt={frontmatter.content.wallet_features.desktop_platforms.title} />
//               </span>
//               <span>{frontmatter.content.wallet_features.desktop_platforms.title}</span>
//             </h4>
//             <p>
//               {frontmatter.content.wallet_features.desktop_platforms.description}
//             </p>
//           </div>
//         </Features>
//         <Features>
//           {/* <h3>{frontmatter.content.wallet_features.title}</h3> */}
//           <div>
//             <h4>
//               <span>
//                 <img src={NewsIcon} alt={frontmatter.content.wallet_features.newsfeed.title} />
//               </span>
//               <span>{frontmatter.content.wallet_features.newsfeed.title}</span>
//             </h4>
//             <p>
//               {frontmatter.content.wallet_features.newsfeed.description}
//             </p>
//             <h4>
//               <span>
//                 <img src={ThemeIcon} alt={frontmatter.content.wallet_features.personalization.title} />
//               </span>
//               <span>{frontmatter.content.wallet_features.personalization.title}</span>
//             </h4>
//             <p>
//               {frontmatter.content.wallet_features.personalization.description}
//             </p>
//           </div>
//         </Features>
//       </Container>
//     )}
//   />
// )
